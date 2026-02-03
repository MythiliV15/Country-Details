export function setupPagination(data, itemsPerPage, onPageChange) {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    const totalPages = Math.ceil(data.length / itemsPerPage);

    for (let page = 1; page <= totalPages; page++) {
        const button = document.createElement("button");
        button.innerText = page;

        button.addEventListener("click", () => {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            onPageChange(data.slice(start, end));
        });

        paginationDiv.appendChild(button);
    }
}
