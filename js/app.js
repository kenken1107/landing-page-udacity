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
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createHTMLElement(id, value){
    return `<a class=menu__link data-info=${id}>${value}</a>`
}

// Reference to: https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
function isElementInViewport(el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
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
function addActiveClass(){
    for (let i=0; i < sectionList.length; i++){
        if (isElementInViewport(sectionList[i])){
            sectionList[i].classList.add("your-active-class");
        }else{
            sectionList[i].classList.remove("your-active-class");
        }
    }
}

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

// // Apply and Remove CSS when Scrolled section
document.addEventListener('scroll', ()=>{
    addActiveClass();
});

// Scroll to section on link click
const navigationUlElement = document.querySelector('#navbar__list');
navigationUlElement.addEventListener('click', (event)=>{
    event.preventDefault();
    scrollTO(event);
});
