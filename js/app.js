// Variables
const courses = document.querySelector('#fashion-list'),
shoppingCartContent = document.querySelector('#cart-content tbody'),
clearCartBtn = document.querySelector('#clear-cart');


// Listeners

loadEventListeners();

function loadEventListeners() {
  // When a new clothes is added
  courses.addEventListener('click', buyCourse);

  // When the remove button is clicked
  shoppingCartContent.addEventListener('click', removeCourse);

  // Clear Cart Btn
  clearCartBtn.addEventListener('click', clearCart);

  // Document Ready
  document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}


// Functions
function buyCourse(e) {
  e.preventDefault();
  // Use delegation to find the clothes that was added
  if(e.target.classList.contains('add-to-cart')){
    // read the clothes values
    const course = e.target.parentElement.parentElement;

    // read the values
    getCourseInfo(course);

  }
}
// Read the HTML information of the selected clothes
function getCourseInfo(course) {
  // Create an object with clothes Data
  const courseInfo = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.price span').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  }
  // Insert into the shopping cart
  addIntoCart(courseInfo);
}

// Display the selected course into the shopping cart

function addIntoCart(course) {
  // Create a <tr>
  const row = document.createElement('tr');

  // Build the template
  row.innerHTML = `
  <tr>
       <td>
          <img src="${course.image}" width=100>
          </td>
          <td>${course.title}</td>
          <td>${course.price}</td>
          </td>
              <a href="#" class="remove" data-id="${course.id}">X</a>
        </td>
  </tr>
   `; 
   // Add into the shopping cart
   shoppingCartContent.appendChild(row);

   // Add clothes into storage
   saveIntoStorage(course);

            
}

// Add the clothes into the local storage

function saveIntoStorage(course) {
  let courses = getCoursesFromStorage();

  // Add the clothe into the array
  courses.push(course);

  // Since storage only saves strings, we need to convert JSON into string
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Get the contents from storage
function getCoursesFromStorage() {

  let courses;


  // if something exist on storage then we get the value, otherwise create an empty array.
  if(localStorage.getItem('courses') === null){
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem('courses'));
  }

return courses;
}

// remove courses from the dom
function removeCourse(e) {
  let course, courseId;

  // Remove from the dom
  if(e.target.classList.contains('remove')) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector('a').getAttribute('data-id');
  }
  console.log(courseId);
  // Remove from local storage
  removeCourselocalStorage(courseId);
  
}

// Remove from local storage
function removeCourselocalStorage(id) {
  // get the local storage data
  let coursesLS = getCoursesFromStorage();

  // Loop through the array and find the index to remove
  coursesLS.forEach(function(courseLS,index) {
    if(courseLS.id === id) {
      coursesLS.splice(index, 1);
    }
  });

  // Add the rest of the array
  localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// Clear the shopping cart
function clearCart () {
  // shoppingCartContent.innerHTML ='';

  while(shoppingCartContent.firstChild) {
      shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
   
    // Clear from local storage
    clearLocalStorage();
  }
  // Clear the whole local storage
  function clearLocalStorage() {
    localStorage.clear();
    }

  // Loads when document is ready, print clothes into shopping cart

  function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // Loop through the courses and print into the cart
    coursesLS.forEach(function(course){
      // Create the <tr>
      const row = document.createElement('tr');

      // Print the content
      row.innerHTML = `
              <tr>
                <td>
                  <img src="${course.image}" width=100>
                  </td>
                    <td>${course.title}</td>
                    <td>${course.price}</td>
                    <td>
                       <a href="#" class="remove" data-id="${course.id}">X</a>
                       </td>
                       </tr>
                       `;
                       shoppingCartContent.appendChild(row);
    });
  }

