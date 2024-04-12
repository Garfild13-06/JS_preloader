function addItem(code, value) {
    const items = document.querySelector('#items');
    const item = document.createElement("div");
    item.classList.add('item');
    const item__code = document.createElement("div");
    item__code.classList.add('item__code');
    item__code.textContent = code;
    const item__value = document.createElement("div");
    item__value.classList.add('item__value');
    item__value.textContent = value;
    const item__currency = document.createElement("div");
    item__currency.classList.add('item__currency');
    item__currency.textContent = 'руб.';
    item.appendChild(item__code);
    item.appendChild(item__value);
    item.appendChild(item__currency);
    items.appendChild(item);
}

const Valutes = JSON.parse(localStorage.getItem('storageValutes'))

if (Valutes != null && Valutes.length != 0) {
    loader = document.querySelector('.loader');
    loader.classList.remove('loader_active');
    for (const Valute of Valutes) {
        addItem(Valute[0], Valute[1]);
    }
} else {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == xhr.DONE) {
            const Valutes = JSON.parse(xhr.responseText).response.Valute;
            loader = document.querySelector('.loader');
            loader.classList.remove('loader_active');
            let storageValutes = []
            for (const Valute in Valutes) {
                addItem(Valutes[Valute]["CharCode"], Valutes[Valute]["Value"]);
                storageValutes.push([Valutes[Valute]["CharCode"], Valutes[Valute]["Value"]])
            }
            localStorage.setItem('storageValutes', JSON.stringify(storageValutes))

        }
    })

    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses', true)
    xhr.send()
}

