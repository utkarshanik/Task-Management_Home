
  function performSearch() {
    let searchValue = document.getElementById('searchBox').value.toLowerCase();
    console.log(searchValue);
    let dataItems = document.querySelectorAll('#dataSource .data-item');

    // Clear previous highlights
    dataItems.forEach(item => {
        item.innerHTML = item.textContent;
    });

    // Highlight matching text
    dataItems.forEach(item => {
        let text = item.textContent.toLowerCase();
        if (text.includes(searchValue) && searchValue !== '')
         {
            let regex = new RegExp(`(${searchValue})`, 'gi');
            console.log(regex)
            item.innerHTML = item.textContent.replace(regex, '<span class="highlight ">$1</span>');
          }
          
    });
  }

