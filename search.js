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

    // Ensure scrolling works
    if (firstMatch) {
        setTimeout(() => {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }, 100); // Adding a slight delay for smooth scrolling
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
