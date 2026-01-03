// Vi använder DOMContentLoaded eventet för att garantera att HTML "skelettet" har laddat och skriptet
// säkert kan referera de element vi använder getElementById och querySelectorAll på. DOMContentLoaded
// väntar endast på DOM elements, inte på bilder och CSS!
document.addEventListener('DOMContentLoaded', () => {
    // Har nu id så att vi kan fetcha smidigt
    // mainImage blir en referens (Pass by Reference) - som en GPS-länk till bilden på sidan!
    const mainImage = document.getElementById('product-main-image');

    // Safety check! Kör scriptet om och endast om vi hittar bilden! Om ID:t ändras i HTML kraschar inte hela sidan.
    if (!mainImage) {
        console.error("Oops! Kunde inte hitta 'product-main-image'. Kontrollera ditt HTML ID.");
        return; // Stoppar skriptet här så det inte kraschar
    }

    const sourceTags = document.querySelectorAll('.hero-source'); // Våra <source>-taggar som vi satt upp tidigare. The querySelectorAll method returnerar en NodeList!
    const thumbnails = document.querySelectorAll('.hero-thumbnails .thumbnail');

    // Lagra the original hero jpg source. I och med att detta är en string och därmed a primitive används Pass by Value
    const originalMainSrc = mainImage.getAttribute('src');

    // Lagra the original srcsets so att vi kan återkalla de senare när det behövs!
    const originalSrcsets = []; // Initialisera som en tom Array
    
    sourceTags.forEach(source => { // Gå igenom vår sourceTags NodeList (NodeLists kan också använda the Array method 'forEach'! Men inte 'push'. De är "read-only objects for the interweb")
        originalSrcsets.push({ // För varje source i the sourceTags NodeList, append ett Object (Python Dict equivalent) med nycklarna...
            element: source, // ... 'element' för the <source> tag i vår sourceTags NodeList...
            srcset: source.getAttribute('srcset') // ... och 'srcset' för the actual source set vilket vi får genom the getAttribute method. Själva text-strängen med bildfiler
            // Genom att spara 'element: source' sparar vi adressen, inte en kopia av taggen.
            // Det gör att vi kan "peta" på objektet senare och se ändringen direkt på skärmen.
        });
    });

    thumbnails.forEach(thumbnail => { // For each thumbnail i vår thumbnails NodeList... (använder oxå querySelectorAll!)
        thumbnail.addEventListener('click', function() { // ...lägg till en click eventListener som...
            // 1. Tar bort 'active' class:en från *alla* thumbnails. Alla addresser i objektet
            thumbnails.forEach(t => t.classList.remove('active')); // Vi har redan använt 'thumbnail' i forEach så vi kör bara 't' här
            
            // 2. Lägger till 'active' class:en på den thumbnail användaren precis klickat på
            // 'this' pekar på adressen till just den thumbnail som klickades på och hanteras av vår eventListener
            this.classList.add('active');

            // Bilden vi ska byta till
            const targetImage = this.getAttribute('data-image-src');

            if (targetImage === 'reset') {
                // Återkalla vår high quality hero image! Vi använder våra sparade adresser för att "måla tillbaka 'srcset' på huset".
                originalSrcsets.forEach(item => {
                    item.element.setAttribute('srcset', item.srcset);
                });

                // Peka tillbaka huvudbildens referens till original-JPGn.
                mainImage.src = originalMainSrc;
            } else {
                // Visa en "simpel" jpg. För att tvinga webbläsaren att visa vår screenshot måste vi "stänga av" 
                // srcset-logiken genom att ta bort attributet via våra referenser.
                sourceTags.forEach(source => {
                    source.removeAttribute('srcset');
                });

                // Byt ut källan på huvudbilden via dess minnesadress
                mainImage.src = targetImage;
            }
        });
    });
});