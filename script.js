import data from "./data.json" with { type: "json" };

const containerWrappers = document.querySelectorAll('.status-card-wrapper');
const cardSelect = document.querySelectorAll('.user-card-select');

//we use this to append items from the json file to a given container, selecting the view (daily,monthly,weekly) if necessary
const appendItem = (container, item, view = 'daily') => {
    const todo = document.createElement('div');
    todo.classList.add('status-card');
    todo.innerHTML = `
    <div class="status-header">
              <span>${item.title}</span><img src="/images/icon-ellipsis.svg" />
            </div>            
            <div class="status-hours">
              <p class="status-current">${item.timeframes[view].current}hrs</p>              
              <p class="status-previous">Previous - ${item.timeframes[view].previous}hrs</p>
            </div>
            
    `;

    container.appendChild(todo);
}

//populating the container wrappers with the daily view as a default value
data.forEach((item, index) => {   

    appendItem(containerWrappers[index], item);
})

//every time we click on a view, the container wrappers are emptied and repopulated with the data corresponding to that view
for (const card of cardSelect){
    
    card.addEventListener('click', ()=>{        
        const view = card.textContent.toLowerCase();

        //removing the active class from all the elements
        cardSelect.forEach(otherCard => otherCard.classList.remove('active'));

        //adding the active class to the clicked element
        card.classList.add('active');
        
        //adding the data corresponding to the view
        data.forEach((item, index) => {   
            containerWrappers[index].innerHTML = '';
            appendItem(containerWrappers[index], item, view);                           
        })        
    })    
}




