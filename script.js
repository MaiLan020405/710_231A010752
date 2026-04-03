// script.js

// === BÀI 1: TÌM KIẾM SẢN PHẨM ===
if (document.getElementById('product-list')) {
    const products = [
        { id: 1, name: 'Laptop Dell XPS', price: '30,000,000đ' },
        { id: 2, name: 'MacBook Pro M2', price: '35,000,000đ' },
        { id: 3, name: 'Điện thoại iPhone 15', price: '25,000,000đ' },
        { id: 4, name: 'Samsung Galaxy S24', price: '22,000,000đ' },
        { id: 5, name: 'Tai nghe AirPods Pro', price: '5,000,000đ' }
    ];

    const renderProducts = (items) => {
        const container = document.getElementById('product-list');
        container.innerHTML = '';
        if (items.length === 0) {
            container.innerHTML = '<p style="color:red;">Không tìm thấy sản phẩm nào.</p>';
            return;
        }
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'product-card';
            // Sử dụng textContent để tránh XSS injection
            const nameEl = document.createElement('h3');
            nameEl.textContent = item.name;
            const priceEl = document.createElement('p');
            priceEl.textContent = item.price;
            div.appendChild(nameEl);
            div.appendChild(priceEl);
            container.appendChild(div);
        });
    };

    renderProducts(products);

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
        renderProducts(filtered);
    });
}

// === BÀI 2: FORM VALIDATION ===
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const agree = document.getElementById('agree').checked;
        const messageBox = document.getElementById('formMessage');

        // Regex validate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        if (!name || !emailRegex.test(email) || !passRegex.test(password) || !agree) {
            messageBox.innerHTML = '<span class="error-msg" style="display:block">Vui lòng kiểm tra lại thông tin. Mật khẩu cần ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số.</span>';
            return;
        }

        // Lưu vào LocalStorage
        const user = { name, email };
        localStorage.setItem('registeredUser', JSON.stringify(user));
        
        messageBox.innerHTML = '<span class="success-msg">Đăng ký thành công! Dữ liệu đã được lưu cục bộ.</span>';
        this.reset();
    });
}

// === BÀI 3: COUNTDOWN TIMER ===
if (document.getElementById('timer')) {
    let timeLeft = 10 * 60; // 10 phút
    const timerDisplay = document.getElementById('timer');
    
    const updateTimer = () => {
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        timerDisplay.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds}`;
        
        if (timeLeft < 60) {
            timerDisplay.classList.add('danger');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00";
            timerDisplay.classList.remove('danger');
            alert("Hết thời gian!");
        } else {
            timeLeft--;
        }
    };
    
    updateTimer(); // Khởi tạo ngay
    const timerInterval = setInterval(updateTimer, 1000);
}