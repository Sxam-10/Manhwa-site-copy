(function () {
    const yearNodes = document.querySelectorAll('[data-current-year]');
    const currentYear = String(new Date().getFullYear());
    yearNodes.forEach((node) => {
        node.textContent = currentYear;
    });

    const searchInput = document.getElementById('catalogSearch');
    const cards = Array.from(document.querySelectorAll('[data-catalog-card]'));
    const noResults = document.getElementById('catalogNoResults');

    if (!searchInput || cards.length === 0 || !noResults) {
        return;
    }

    const applyFilter = () => {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach((card) => {
            const haystack = [
                card.getAttribute('data-title') || '',
                card.getAttribute('data-tags') || ''
            ]
                .join(' ')
                .toLowerCase();

            const isMatch = query.length === 0 || haystack.includes(query);
            card.classList.toggle('is-hidden', !isMatch);

            if (isMatch) {
                visibleCount += 1;
            }
        });

        noResults.classList.toggle('is-hidden', visibleCount !== 0);
    };

    searchInput.addEventListener('input', applyFilter);
    applyFilter();
})();
