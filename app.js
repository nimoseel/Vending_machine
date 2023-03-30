// 입금, 잔액, 소지금 관련
const cashInput = document.querySelector('.inp-put');
const balance = document.querySelector('.balance');
const putbtn = document.querySelector('.btn-put');
const cash = document.querySelector('.cash');

// 입금 버튼 클릭
putbtn.addEventListener('click', ()=>{
    if(cashInput.value === "" || cashInput.value < 0){
        alert('금액을 입력해주세요.');
        cash.textContent = parseInt(cash.textContent);
        balance.textContent = parseInt(balance.textContent);
        cashInput.value = "";
    }
    if(cashInput.value !== "" && cashInput.value <= parseInt(cash.textContent)){
        balance.textContent = parseInt(balance.textContent) + parseInt(cashInput.value);
        cash.textContent = parseInt(cash.textContent) - parseInt(cashInput.value);
        cashInput.value = "";
    }else if(cashInput.value > parseInt(cash.textContent)){
        alert('소지금이 부족합니다.');
        cashInput.value = "";
    }
})

// 거스름돈 반환 버튼 클릭
const returnBtn = document.querySelector('.btn-return');
returnBtn.addEventListener('click',()=>{
    cash.textContent = parseInt(cash.textContent) + parseInt(balance.textContent);
    balance.textContent = 0;
})

// 아이템 클릭
// 아래 칸에 클릭한 아이템 들어감, 최대 5개, 5개 되면 품절 표시 나타남
const itemBtns = document.querySelectorAll('.list-item > li');
const selectList = document.querySelector('.get-data');
let pickedlist = [];

itemBtns.forEach(el => {
    el.onclick = (e) => {
        const selectedItem = e.target;
        const data = selectedItem.querySelector('.btn-item');

        if(parseInt(balance.textContent) === 0){
            alert('잔액이 부족합니다.');
        }else if(parseInt(balance.textContent) >= 1000){
            if(!pickedlist.includes(data.dataset.name)){
                pickedlist.push(data.dataset.name);
                const newLi = document.createElement('li');
                const newBtn = document.createElement('button');
                newBtn.classList.add('btn-picked');
                newLi.setAttribute('data-name', data.dataset.name);
                
                const newImg = document.createElement('img');
                const itemImg = selectedItem.querySelector('.img-item');
                const itemImgSrc = itemImg.getAttribute('src');
                newImg.classList.add('img-picked');
                newImg.setAttribute('src', itemImgSrc);
                
                const newStrong = document.createElement('strong');
                newStrong.classList.add('txt-item');
                newStrong.append(data.dataset.name);
                
                const newSpan = document.createElement('span');
                newSpan.classList.add('num-item');
                newSpan.append('1')

                data.dataset.stock = parseInt(data.dataset.stock) - 1;
                
                newBtn.append(newImg, newStrong, newSpan);
                newLi.append(newBtn);
                selectList.append(newLi);

                balance.textContent = parseInt(balance.textContent) - 1000;
            }else if(pickedlist.includes(data.dataset.name)){
                const span = selectList.querySelector(`li[data-name="${data.dataset.name}"] .num-item`);
                span.textContent = parseInt(span.textContent) + 1;
                data.dataset.stock = parseInt(data.dataset.stock) - 1;
                balance.textContent = parseInt(balance.textContent) - 1000;
            }
        }

        if(parseInt(data.dataset.stock) === 0){
            selectedItem.classList.add('sold-out');
        }
    }
})

// 획득 버튼 클릭
const getBtn = document.querySelector('.btn-get');
const getList = document.querySelector('.cont-myInfo .list-selected');
const nameList = [];

getBtn.addEventListener('click',()=>{
    // 획득한 음료로 들어감
    const getLi = document.querySelectorAll('.get-data > li');

    getLi.forEach(el=>{
        if(!nameList.includes(el.dataset.name)){
            nameList.push(el.dataset.name);
            const newLi = document.createElement('li');
            const newBtn = document.createElement('button');
            newBtn.classList.add('btn-picked');
            newLi.setAttribute('data-name', el.dataset.name);
    
            const newImg = document.createElement('img');
            const itemImg = el.querySelector('.img-picked');
            const itemImgSrc = itemImg.getAttribute('src');
            newImg.classList.add('img-picked');
            newImg.setAttribute('src', itemImgSrc);
    
            const newStrong = document.createElement('strong');
            newStrong.classList.add('txt-item');
            newStrong.append(el.dataset.name);
    
            const newSpan = document.createElement('span');
            const spanTxt = el.querySelector('.num-item');
            newSpan.classList.add('num-item');
            newSpan.textContent = spanTxt.textContent;
    
            newBtn.append(newImg, newStrong, newSpan);
            newLi.append(newBtn);
            getList.append(newLi);
        }else{
            const span = getList.querySelector(`li[data-name="${el.dataset.name}"] .num-item`);
            const spanTxt = el.querySelector('.num-item');
            span.textContent = parseInt(span.textContent) + parseInt(spanTxt.textContent);
        }
    })

    // 총 금액 출력
    const totalTxt = document.querySelector('.div-total .total');
    const Amount = document.querySelectorAll('.list-selected .num-item');
    const amountArr = [];

    Amount.forEach(el=>{
        amountArr.push(parseInt(el.textContent));
    });
    totalTxt.textContent = amountArr.reduce((a,b) => a+b , 0) * 1000;

    // 좌측 selectList 비우기
    selectList.innerHTML = "";
    pickedlist = [];
})
