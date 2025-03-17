function performSearch() {
    let searchValue = document.getElementById('searchBox').value.toLowerCase();
    console.log(searchValue);
    let dataItems = document.querySelectorAll('#dataSource .data-item');

    // Clear previous highlights
    dataItems.forEach(item => {
        item.innerHTML = item.textContent;
    });

    let firstMatch = null; // To keep track of the first matching item

    // Highlight matching text
    dataItems.forEach(item => {
        let text = item.textContent.toLowerCase();
        if (text.includes(searchValue) && searchValue !== '') {
            let regex = new RegExp(`(${searchValue})`, 'gi');
            item.innerHTML = item.textContent.replace(regex, '<span class="highlight">$1</span>');

            // If it's the first match, set it as the target to scroll
            if (!firstMatch) {
                firstMatch = item;
            }
        }
    });

    // Scroll to the first matching item
    console.log(firstMatch);
    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Handle clearing highlights when input is empty
    document.getElementById('searchBox').addEventListener('input', function () {
        if (this.value === '') {
            dataItems.forEach(item => {
                item.innerHTML = item.textContent;
            });
        }
    });
}
