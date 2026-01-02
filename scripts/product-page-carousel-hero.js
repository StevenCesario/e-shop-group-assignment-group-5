document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('hero-main-image'); // Har nu id så att vi kan fetcha smidigt
    const sourceTags = document.querySelectorAll('.hero-source'); // Våra source tags som vi satt upp tidigare. The querySelectorAll method returnerar en NodeList!
    const thumbnails = document.querySelectorAll('.hero-thumbnails .thumbnails');

    // Lagra the original srcsets so att vi kan återkalla de senare när det behövs!
    const originalSrcsets = []; // Initialisera som en tom Array
    sourceTags.forEach(source => { // Gå igenom vår sourceTags NodeList (NodeLists kan också använda the Array method 'push'!)
        originalSrcsets.push({ // För varje source i the sourceTags NodeList, append ett Object (Python Dict equivalent) med nycklarna...
            element: source, // ... 'element' för the source tag i vår sourceTags NodeList...
            srcset: source.getAttribute('srcset') // ... och the actual source set srcset vilket vi får genom the getAttribute method
        });
    });
})