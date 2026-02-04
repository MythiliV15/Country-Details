export function setupPagination(data, itemsPerPage, onPageChange) {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    // Don't show pagination if there are no items or search is active
    if (data.length === 0 || data.length <= itemsPerPage) {
        return;
    }

    const totalPages = Math.ceil(data.length / itemsPerPage);

    for (let page = 1; page <= totalPages; page++) {
        const button = document.createElement("button");
        button.innerText = page;
        
        // Highlight first page by default
        if (page === 1) {
            button.className = 'active';
        }

        button.addEventListener("click", () => {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            onPageChange(data.slice(start, end));
            
            // Update active button
            document.querySelectorAll('#pagination button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });

        paginationDiv.appendChild(button);
    }
}