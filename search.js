const searchKey = decodeURI(location.pathname.split('/').pop());

const searchSpanElement = document.querySelector('#search-key');
//searchSpanElement.innerHTML = searchKey;

console.log(location.pathname.split('/')[1])

// getProducts(searchKey).then(data => createProductSlider(data , '.card-container'));






let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

// checking if user is logged in or not

const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    }).then((res) => res.json())
    // .then(response => {
    //     processData(response)
    // })
}

// sourceCode = document.querySelector('.class="mce-textbox mce-multiline mce-abs-layout-item mce-first mce-last"')

load = document.querySelector('.modal')

conBtn = document.querySelector('.conBtn')
conBtn.onclick = function () {
  location.href = "http://localhost:2000/search/confluence";
}
htBtn = document.querySelector('.htBtn')
htBtn.onclick = function () {
  location.href = "http://localhost:2000/search/html";
}

editBtn = document.querySelector('.editBtn');
proBtn = document.querySelector('.proBtn');
editSpace = document.querySelector('.editSpace')



inUrl = document.getElementById('url');

const productData = () => {
  return data = {
     url : inUrl.value
  }
}





proBtn.addEventListener('click', () => {
  // validate form
  //validateForm return true or false while doing validation

      if(inUrl.value == ''){
        alert('Enter URL')
      }
      else{
        load.style.display = 'block';

        editBtn.style.display = "block";
        htBtn.style.display = "block";
        conBtn.style.display = "block";
      
      let data = productData();
      console.log(data)
      sendData('/search/:key', data);
      setTimeout(function(){
        load.style.display = 'none';

      },50000)
      }

})

var htmlD  = '';

editBtn.addEventListener('click', () =>{
  editSpace.style.display = "block";
  load.style.display = 'block';

  fetch('http://localhost:2000/search/abc')
  .then(response => response.json())
  .then(htmlData =>{ htmlD = htmlData} ) 

  setTimeout(function(){

    navigator.clipboard.writeText(htmlD)
    .then(() => {
       console.log('success')
    })
    .catch(err => {
       console.log('Something went wrong', err);
    });
 
    setTimeout(function(){
      load.style.display = 'none';

    },7000)
  // console.log('htmlD' , htmlD)

  },7000)

})




// console.log(sourceCode)

// async function getPage() {
//   sourceCode.innerHtml = html;;
// }


