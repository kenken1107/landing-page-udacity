/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const fragment = document.createDocumentFragment();
const sectionList = document.querySelectorAll("section");

/**
 * セクションの数だけ、navigationを追加する
 *      1.セクションの「数」+「それぞれのIDを把握」を把握
 *      2. セクションの数だけfor文を回し、liとaタグのエレメントを作成する
 *      3. aのhrefには、上記の取得したIDを入力する
 * 
*/

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createHTMLElement(id, value){
    return `<a class=menu__link data-info=${id}>${value}</a>`
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigations(){
    for (let i = 0; i<sectionList.length; i++){
        const newListElement = document.createElement("li");
        const id             = sectionList[i].getAttribute("id")
        const value          = sectionList[i].getAttribute("data-nav")
        newListElement.innerHTML = createHTMLElement(id, value)
        fragment.appendChild(newListElement);
    }
    const navigationBarElement = document.querySelector("#navbar__list");
    navigationBarElement.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
function scrollTO(event){
    const idToBeScrolled            = event.target.getAttribute('data-info'); // Get ID info towards which to be for scrolling
    const targetElementToBeScrolled = document.querySelector(`#${idToBeScrolled}`);
    targetElementToBeScrolled.scrollIntoView({behavior: 'smooth'})
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavigations()
// Scroll to section on link click
const navigationUlElement = document.querySelector('#navbar__list');
navigationUlElement.addEventListener('click', (event)=>{
    event.preventDefault();
    scrollTO(event);
});
