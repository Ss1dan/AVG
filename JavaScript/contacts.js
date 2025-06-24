document.querySelector('.contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    
    for (const el of form.elements) {
        if (el.required && !el.value.trim()) {
            el.style.borderColor = 'red';
            isValid = false;
        } else {
            el.style.borderColor = '';
        }
    }
    
    const email = form.querySelector('input[type="email"]');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+[^\s@]$/.test(email.value)) {
        email.classList.add('error');
        valid = false;
    }
    
    if (isValid) {
        alert('Форма отправлена!');
        form.reset();
    }
});
