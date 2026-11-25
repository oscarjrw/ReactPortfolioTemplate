// Runs before the first paint, so the page never flashes in the wrong theme.
(function () {
    var theme = 'dark';
    try {
        if (localStorage.getItem('theme') === 'light') theme = 'light';
    } catch (e) { /* private mode */ }
    document.documentElement.dataset.theme = theme;
})();
