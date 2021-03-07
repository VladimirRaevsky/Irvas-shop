const forms = ()=> {

    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach(item => {
        item.addEventListener('input', ()=> {
            item.value = item.value.replace(/\D/, '');
        });
        
    });

    const message = {
        loading: 'Идет загрузка.....',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так'
    };
    

    const postDate = async (url, date)=> {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: date
        }); 

        return await res.text();
    };

    const clearInputs = ()=> {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e)=> {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);
            const formDate = new FormData(item);
   
            postDate('assets/server.php', formDate)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = message.success;
                    })
                    .catch(()=> {
                        statusMessage.textContent = message.failure;
                    })
                    .finally(()=> {
                        clearInputs();
                        setTimeout(()=> {
                           statusMessage.remove();
                        }, 5000);
                    });
                    
        });
                
    });

};

export default forms;