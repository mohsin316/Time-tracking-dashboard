//getting our variables from the dom 

const time = document.querySelectorAll('.time')
const acitivity = document.querySelectorAll('.activity')
const currentTime = document.querySelectorAll('.total-time')
const previousTime = document.querySelectorAll('.previous-time')



//updating the UI in the dom 

const updateUI = (title, value, log) => {

    acitivity.forEach((act ,index) => {
        
        let period = log 
        if (log === 'daily'){
            period = 'Yesterday'
        }else if( log === 'weekly'){
            period = 'Last Week'
        }else if( log === 'monthly'){
            period = 'Last Month'
        }

        if (act.textContent === title){
            currentTime[index].classList.remove('active')
            previousTime[index].classList.remove('active')

            setTimeout(() => {
                currentTime[index].textContent = `${value.current}hrs`
                previousTime[index].textContent = `${period} - ${value.previous}hrs`
            },250)
            
            setTimeout(() => {
                currentTime[index].classList.add('active')
                previousTime[index].classList.add('active')
            },300)

            if(log === 'daily'){
                time[0].classList.add('shift')
                time[1].classList.remove('shift')
                time[2].classList.remove('shift')
            }else if(log === 'weekly'){
                time[1].classList.add('shift')
                time[0].classList.remove('shift')
                time[2].classList.remove('shift')
            }else if(log === 'monthly'){
                time[2].classList.add('shift')
                time[1].classList.remove('shift')
                time[0].classList.remove('shift')
            }

        }
    })
}

//getting the necessary data that we need from the async func

const sortData = (data, log) => {
    data.forEach(item =>{
        let title = item.title
        const timeframes = item.timeframes
        Object.entries(timeframes).forEach( ([key, value]) => {
            if (key === log) {
                updateUI(title, value, log)
            }
        })
    })
    localStorage.setItem('data', JSON.stringify(data))
    localStorage.setItem('log', log)
}

//going through the .json file and accessing the data 

const info = async () => {
    const response = await fetch('data.json');
    const data = await response.json(); 
    return data
}


//adding the eventlistener for clicking

time.forEach( date => {
    date.addEventListener('click', e => {
        const log = e.target.textContent.toLowerCase();
        info()
            .then(data => sortData(data, log))
            .catch(err => console.log(err))
    })
})

//checking if there was data previously stored in local storage

if(localStorage.getItem('log')){
    const data = JSON.parse(localStorage.getItem('data'))
    const log = localStorage.getItem('log')

    data.forEach(item =>{
        let title = item.title
        const timeframes = item.timeframes
        Object.entries(timeframes).forEach( ([key, value]) => {
            if (key === log) {
                updateUI(title, value, log)
            }
        })
    })
}

//extra code. ignore this bottom part

/*time.addEventListener('click', e => {
        const log = e.target.textContent;
        info(log.toLowerCase())
            .then(data => sortData(data, log.toLowerCase()))
            .catch(err => console.log(err))
    })*/

