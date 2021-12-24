/* eslint-disable no-unused-vars */

// Enable tooltips everywhere
var tooltipTriggerList = [].slice.call(document.querySelectorAll("[data-bs-toggle=\"tooltip\"]"));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl)
{
    // eslint-disable-next-line no-undef
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
