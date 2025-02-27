// VERSION 444
function goBack() {
    window.history.back();
};

document.addEventListener('DOMContentLoaded', function() {
    // Получение данных о пользователях
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const usersContainer = document.getElementById('usersContainer');
            if (!usersContainer) return; // Добавлена проверка на наличие контейнера
            users.forEach(user => {
                const userBlock = document.createElement('div');
                userBlock.classList.add('user');
                userBlock.innerHTML = `
                    <p>ID: ${user.id}</p>
                    <p>Name: ${user.name}</p>
                    <a href="user-details.html?id=${user.id}" class="user-details-link">Show Details</a>
                `;
                usersContainer.appendChild(userBlock);
            });
        })
        .catch(error => console.error('Ошибка загрузки пользователей:', error));

    // Функция для получения параметра из URL
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Определение текущей страницы и выполнение соответствующих действий
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'user-details.html') {
        const userId = getParameterByName('id');
        const userInfoContainer = document.getElementById('userDetailsContainer');
        const userPostsContainer = document.getElementById('userPostsContainer');

        // Получение данных о пользователе по userId
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                if (!userInfoContainer) return; // Добавлена проверка на наличие контейнера
                userInfoContainer.innerHTML = `
                    <p>ID: ${user.id}</p>
                    <p>Name: ${user.name}</p>
                    <p>Email: ${user.email}</p>
                    <p>Phone: ${user.phone}</p>
                    <p>Website: ${user.website}</p>
                    <p>Company: ${user.company.name}</p>
                    <p>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
                `;
            })
            .catch(error => console.error('Ошибка загрузки информации о пользователе:', error));

        // Функция для отображения постов текущего пользователя
        function showUserPosts() {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(response => response.json())
                .then(posts => {
                    if (!userPostsContainer) return; // Добавлена проверка на наличие контейнера
                    userPostsContainer.innerHTML = '';
                    posts.forEach(post => {
                        const postLink = document.createElement('a');
                        postLink.classList.add('post-link');
                        postLink.textContent = post.title;
                        postLink.href = `post-details.html?id=${post.id}`;
                        userPostsContainer.appendChild(postLink);
                    });
                })
                .catch(error => console.error('Ошибка загрузки постов пользователя:', error));
        }

        // Добавление кнопок "Show Posts" и "Hide Posts" на страницу User Details
        const showPostsBtn = document.createElement('button');
        showPostsBtn.textContent = 'Show Posts';
        showPostsBtn.addEventListener('click', function() {
            showPostsBtn.style.display = 'none';
            hidePostsBtn.style.display = 'block';
            userPostsContainer.style.display = 'block';
            showUserPosts(); // Вызов функции для отображения постов при нажатии на кнопку "Show Posts"
        });
        if (userPostsContainer) userPostsContainer.appendChild(showPostsBtn); // Добавлена проверка на наличие контейнера

        const hidePostsBtn = document.createElement('button');
        hidePostsBtn.textContent = 'Hide Posts';
        hidePostsBtn.style.display = 'none'; // Начально скрываем кнопку "Hide Posts"
        hidePostsBtn.addEventListener('click', function() {
            hidePostsBtn.style.display = 'none';
            showPostsBtn.style.display = 'block';
            userPostsContainer.style.display = 'none';
        });
        if (userInfoContainer) userInfoContainer.appendChild(hidePostsBtn); // Добавлена проверка на наличие контейнера
    } else if (currentPage === 'post-details.html') {
        const postId = getParameterByName('id');
        const postDetailsContainer = document.getElementById('postDetailsContainer');
        const commentsContainer = document.getElementById('commentsContainer');

        // Получение данных о посте по postId
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(post => {
                if (!postDetailsContainer) return; // Добавлена проверка на наличие контейнера
                postDetailsContainer.innerHTML = `
                    <p>ID: ${post.id}</p>
                    <p>Title: ${post.title}</p>
                    <p>Body: ${post.body}</p>
                `;
            })
            .catch(error => console.error('Ошибка загрузки информации о посте:', error));

        // Получение комментариев к посту по postId
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(comments => {
                if (!commentsContainer) return; // Добавлена проверка на наличие контейнера
                commentsContainer.innerHTML = '';
                comments.forEach(comment => {
                    const commentBlock = document.createElement('div');
                    commentBlock.classList.add('comment');
                    commentBlock.innerHTML = `
                        <p>Name: ${comment.name}</p>
                        <p>Email: ${comment.email}</p>
                        <p>Body: ${comment.body}</p>
                    `;
                    commentsContainer.appendChild(commentBlock);
                });
            })
            .catch(error => console.error('Ошибка загрузки комментариев к посту:', error));
    }
});



// // VERSION 333
// // Errors:
// //     script.js:24 Ошибка загрузки пользователей: TypeError: Cannot read properties of null (reading 'appendChild')
// //     at script.js:21:32
// //     at Array.forEach (<anonymous>)
// //     at script.js:13:19
// // Функция для перехода на предыдущую страницу
// function goBack() {
//     window.history.back();
// };
//
// document.addEventListener('DOMContentLoaded', function() {
//     // Получение данных о пользователях
//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then(response => response.json())
//         .then(users => {
//             const usersContainer = document.getElementById('usersContainer');
//             users.forEach(user => {
//                 const userBlock = document.createElement('div');
//                 userBlock.classList.add('user');
//                 userBlock.innerHTML = `
//                     <p>ID: ${user.id}</p>
//                     <p>Name: ${user.name}</p>
//                     <a href="user-details.html?id=${user.id}" class="user-details-link">Show Details</a>
//                 `;
//                 usersContainer.appendChild(userBlock);
//             });
//         })
//         .catch(error => console.error('Ошибка загрузки пользователей:', error));
//
//     // Функция для получения параметра из URL
//     function getParameterByName(name, url) {
//         if (!url) url = window.location.href;
//         name = name.replace(/[\[\]]/g, '\\$&');
//         const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//             results = regex.exec(url);
//         if (!results) return null;
//         if (!results[2]) return '';
//         return decodeURIComponent(results[2].replace(/\+/g, ' '));
//     }
//
//     // Определение текущей страницы и выполнение соответствующих действий
//     const currentPage = window.location.pathname.split('/').pop();
//     if (currentPage === 'user-details.html') {
//         const userId = getParameterByName('id');
//         const userInfoContainer = document.getElementById('userDetailsContainer');
//         const userPostsContainer = document.getElementById('userPostsContainer');
//
//         // Получение данных о пользователе по userId
//         fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//             .then(response => response.json())
//             .then(user => {
//                 userInfoContainer.innerHTML = `
//                     <p>ID: ${user.id}</p>
//                     <p>Name: ${user.name}</p>
//                     <p>Email: ${user.email}</p>
//                     <p>Phone: ${user.phone}</p>
//                     <p>Website: ${user.website}</p>
//                     <p>Company: ${user.company.name}</p>
//                     <p>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
//                 `;
//             })
//             .catch(error => console.error('Ошибка загрузки информации о пользователе:', error));
//
//         // Функция для отображения постов текущего пользователя
//         function showUserPosts() {
//             fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
//                 .then(response => response.json())
//                 .then(posts => {
//                     userPostsContainer.innerHTML = '';
//                     posts.forEach(post => {
//                         const postLink = document.createElement('a');
//                         postLink.classList.add('post-link');
//                         postLink.textContent = post.title;
//                         postLink.href = `post-details.html?id=${post.id}`;
//                         userPostsContainer.appendChild(postLink);
//                     });
//                 })
//                 .catch(error => console.error('Ошибка загрузки постов пользователя:', error));
//         }
//
// // Добавление кнопки "Hide Posts" на страницу User Details
//         const hidePostsBtn = document.createElement('button');
//         hidePostsBtn.textContent = 'Hide Posts';
//         hidePostsBtn.style.display = 'none'; // Начально скрываем кнопку "Hide Posts"
//         hidePostsBtn.addEventListener('click', function() {
//             hidePostsBtn.style.display = 'none';
//             showPostsBtn.style.display = 'block';
//             userPostsContainer.style.display = 'none';
//         });
//         document.getElementById('userDetailsContainer').appendChild(hidePostsBtn);
//
//         const showPostsBtn = document.createElement('button');
//         showPostsBtn.textContent = 'Show Posts';
//         showPostsBtn.addEventListener('click', function() {
//             showPostsBtn.style.display = 'none';
//             hidePostsBtn.style.display = 'block';
//             userPostsContainer.style.display = 'block';
//         });
//         userPostsContainer.appendChild(showPostsBtn);
//         showPostsBtn.textContent = 'Show Posts';
//         showPostsBtn.addEventListener('click', showUserPosts);
//         userPostsContainer.appendChild(showPostsBtn);
//     } else if (currentPage === 'post-details.html') {
//         const postId = getParameterByName('id');
//         const postDetailsContainer = document.getElementById('postDetailsContainer');
//         const commentsContainer = document.getElementById('commentsContainer');
//
//         // Получение данных о посте по postId
//         fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
//             .then(response => response.json())
//             .then(post => {
//                 postDetailsContainer.innerHTML = `
//                     <p>ID: ${post.id}</p>
//                     <p>Title: ${post.title}</p>
//                     <p>Body: ${post.body}</p>
//                 `;
//             })
//             .catch(error => console.error('Ошибка загрузки информации о посте:', error));
//
//         // Получение комментариев к посту по postId
//         fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
//             .then(response => response.json())
//             .then(comments => {
//                 commentsContainer.innerHTML = '';
//                 comments.forEach(comment => {
//                     const commentBlock = document.createElement('div');
//                     commentBlock.classList.add('comment');
//                     commentBlock.innerHTML = `
//                         <p>Name: ${comment.name}</p>
//                         <p>Email: ${comment.email}</p>
//                         <p>Body: ${comment.body}</p>
//                     `;
//                     commentsContainer.appendChild(commentBlock);
//                 });
//             })
//             .catch(error => console.error('Ошибка загрузки комментариев к посту:', error));
//     }
// });


// VERSION 222
// // Функция для перехода на предыдущую страницу
// function goBack() {
//     window.history.back();
// };
//
// document.addEventListener('DOMContentLoaded', function() {
//     // Получение данных о пользователях
//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then(response => response.json())
//         .then(users => {
//             const usersContainer = document.getElementById('usersContainer');
//             users.forEach(user => {
//                 const userBlock = document.createElement('div');
//                 userBlock.classList.add('user');
//                 userBlock.innerHTML = `
//                     <p>ID: ${user.id}</p>
//                     <p>Name: ${user.name}</p>
//                     <a href="user-details.html?id=${user.id}" class="user-details-link">Show Details</a>
//                 `;
//                 usersContainer.appendChild(userBlock);
//             });
//         })
//         .catch(error => console.error('Ошибка загрузки пользователей:', error));
//
//     // Функция для получения параметра из URL
//     function getParameterByName(name, url) {
//         if (!url) url = window.location.href;
//         name = name.replace(/[\[\]]/g, '\\$&');
//         const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//             results = regex.exec(url);
//         if (!results) return null;
//         if (!results[2]) return '';
//         return decodeURIComponent(results[2].replace(/\+/g, ' '));
//     }
//
//     // Определение текущей страницы и выполнение соответствующих действий
//     const currentPage = window.location.pathname.split('/').pop();
//     if (currentPage === 'user-details.html') {
//         const userId = getParameterByName('id');
//         const userInfoContainer = document.getElementById('userDetailsContainer');
//         const userPostsContainer = document.getElementById('userPostsContainer');
//
//         // Получение данных о пользователе по userId
//         fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//             .then(response => response.json())
//             .then(user => {
//                 userInfoContainer.innerHTML = `
//                     <p>ID: ${user.id}</p>
//                     <p>Name: ${user.name}</p>
//                     <p>Email: ${user.email}</p>
//                     <p>Phone: ${user.phone}</p>
//                     <p>Website: ${user.website}</p>
//                     <p>Company: ${user.company.name}</p>
//                     <p>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
//                 `;
//             })
//             .catch(error => console.error('Ошибка загрузки информации о пользователе:', error));
//
//         // Функция для отображения постов текущего пользователя
//         function showUserPosts() {
//             fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
//                 .then(response => response.json())
//                 .then(posts => {
//                     userPostsContainer.innerHTML = '';
//                     posts.forEach(post => {
//                         const postLink = document.createElement('a');
//                         postLink.classList.add('post-link');
//                         postLink.textContent = post.title;
//                         postLink.href = `post-details.html?id=${post.id}`;
//                         userPostsContainer.appendChild(postLink);
//                     });
//                 })
//                 .catch(error => console.error('Ошибка загрузки постов пользователя:', error));
//         }
//
//         // Добавление кнопки "Hide Posts" на страницу User Details
//         const hidePostsBtn = document.createElement('button');
//         hidePostsBtn.textContent = 'Hide Posts';
//         hidePostsBtn.style.display = 'none'; // Начально скрываем кнопку "Hide Posts"
//         hidePostsBtn.addEventListener('click', function() {
//             hidePostsBtn.style.display = 'none';
//             showPostsBtn.style.display = 'block';
//             userPostsContainer.style.display = 'none';
//         });
//         document.getElementById('userDetailsContainer').appendChild(hidePostsBtn);
//
//         const showPostsBtn = document.createElement('button');
//         showPostsBtn.addEventListener('click', function() {
//             showPostsBtn.style.display = 'none';
//             hidePostsBtn.style.display = 'block';
//             userPostsContainer.style.display = 'block';
//         });
//         showPostsBtn.textContent = 'Show Posts';
//         showPostsBtn.addEventListener('click', showUserPosts);
//         userPostsContainer.appendChild(showPostsBtn);
//     } else if (currentPage === 'post-details.html') {
//         const postId = getParameterByName('id');
//         const postDetailsContainer = document.getElementById('postDetailsContainer');
//         const commentsContainer = document.getElementById('commentsContainer');
//
//         // Получение данных о посте по postId
//         fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
//             .then(response => response.json())
//             .then(post => {
//                 postDetailsContainer.innerHTML = `
//                     <p>ID: ${post.id}</p>
//                     <p>Title: ${post.title}</p>
//                     <p>Body: ${post.body}</p>
//                 `;
//             })
//             .catch(error => console.error('Ошибка загрузки информации о посте:', error));
//
//         // Получение комментариев к посту по postId
//         fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
//             .then(response => response.json())
//             .then(comments => {
//                 commentsContainer.innerHTML = '';
//                 comments.forEach(comment => {
//                     const commentBlock = document.createElement('div');
//                     commentBlock.classList.add('comment');
//                     commentBlock.innerHTML = `
//                         <p>Name: ${comment.name}</p>
//                         <p>Email: ${comment.email}</p>
//                         <p>Body: ${comment.body}</p>
//                     `;
//                     commentsContainer.appendChild(commentBlock);
//                 });
//             })
//             .catch(error => console.error('Ошибка загрузки комментариев к посту:', error));
//     }
// });


// // VERSION 111
// document.addEventListener('DOMContentLoaded', function() {
//
// // Получение данных о пользователях
//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then(response => response.json())
//         .then(users => {
//             // Создание блоков для каждого пользователя и добавление их на страницу
//             const usersContainer = document.getElementById('usersContainer');
//             users.forEach(user => {
//                 const userBlock = document.createElement('div');
//                 userBlock.classList.add('user-block');
//                 userBlock.innerHTML = `
//                     <p>ID: ${user.id}</p>
//                     <p>Name: ${user.name}</p>
//                     <button onclick="showUserDetails(${user.id})">Show Details</button>
//                 `;
//                 usersContainer.appendChild(userBlock);
//             });
//         });
//
// // Функция для отображения подробной информации о пользователе
//     function showUserDetails(userId) {
//         // Переход на страницу user-details.html с параметром userId
//         window.location.href = `user-details.html?id=${userId}`;
//     };
//
// // Получение данных о постах текущего пользователя
//     function showUserPosts(userId) {
//         fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
//             .then(response => response.json())
//             .then(posts => {
//                 // Отображение заголовков постов на странице
//                 const postsContainer = document.getElementById('userPosts');
//                 postsContainer.innerHTML = '';
//                 posts.forEach(post => {
//                     const postTitle = document.createElement('p');
//                     postTitle.textContent = post.title;
//                     postsContainer.appendChild(postTitle);
//                 });
//             });
//     };
//
//
// // Функция для перехода на предыдущую страницу
//     function goBack() {
//         window.history.back();
//     };
//
// // Получение параметра из URL
//     function getParameterByName(name, url) {
//         if (!url) url = window.location.href;
//         name = name.replace(/[\[\]]/g, '\\$&');
//         const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//             results = regex.exec(url);
//         if (!results) return null;
//         if (!results[2]) return '';
//         return decodeURIComponent(results[2].replace(/\+/g, ' '));
//     };
//
// // Определение текущей страницы и выполнение соответствующих действий
//     const currentPage = window.location.pathname.split('/').pop();
//     if (currentPage === 'user-details.html') {
//         // Получение id пользователя из URL
//         const userId = getParameterByName('id');
//         // Вызов функции для отображения информации о пользователе и его постов
//         showUserDetails(userId);
//         showUserPosts(userId);
//     } else if (currentPage === 'post-details.html') {
//         // Получение id поста из URL
//         const postId = getParameterByName('id');
//         // Вызов функции для отображения информации о посте и его комментариев
//         showPostDetails(postId);
//         showPostComments(postId);
//     };
//
// });

// // Функция для добавления класса с анимацией при загрузке страницы
// function addFadeInAnimation() {
//     document.body.classList.add('fade-in');
//     setTimeout(() => {
//         document.body.classList.add('active');
//     }, 100); // Задержка, чтобы анимация сработала после загрузки страницы
// }
//
// // Вызов функции для добавления анимации
// addFadeInAnimation();