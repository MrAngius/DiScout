class DataBaseFilter
{

    //Bind the object with the DataBase
    constructor(file)
    {
        this.file = file;
    }

    //Request to the local server for the database file.
    filterRequest(filter)
    {

        const file = this.file;
        const JSONText = null;
        const rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        const databaseFilter = this;
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status === 0)
                {
                    const allText = rawFile.responseText;
                    const JSONContent = JSON.parse(allText);
                    DataBaseFilter.filter(JSONContent,filter);

                }
            }
        };
        rawFile.send(null);
    }

    //Filter and Display
    static filter(JSONContent, filter)
    {
        const body = document.querySelector('body');
        let product;
        for(let i = 0; i < JSONContent.length; i++)
        {
            product = JSONContent[i];
            if (product.description.includes(filter))
            {
                //ONLY FOR TEST//
                const p = document.createElement('p');
                p.innerText = product.productName;
                body.appendChild(p);
            }
        }
    }
    //Sort the displayed element and redisplay them
    sortRequest(sortParameter)
    {

        //Get the current element in the display window

        //var displayedElements = document.querySelector('.elementsOfWindow');

        /*elementsOfWindow is meant to be remplaced
        by the class of results elementsOfWindow*/

        //Then some code to convert selection to array before sorting it out.

        //ONLY FOR TEST//
        const elements =
            [
                {
                    productName: "My super Television",
                    description: ["multimedia", "house"],
                    grade: 5,
                    originalWebsite: "amazon.fr",
                    price: 200
                },
                {
                    productName: "My super Computer",
                    description: ["multimedia", "game"],
                    grade: 3,
                    originalWebsite: "leboncoin.fr",
                    price: 500
                }
            ];
        elements.sort(function(a, b)
        {
            switch(sortParameter)
            {
                /*
                You can currently sort by :
                PRICE // GRADE // ORIGINAL WEBSITE
                */
                case 'price':
                {
                    return a.price - b.price;
                }
                case 'grade':
                {
                    return a.grade - b.grade;
                }
                case 'originalWebsite':
                {
                    if(a.originalWebsite <= b.originalWebsite)
                    {
                        return -1;
                    }
                    else
                    {
                        return 1;
                    }
                }
            }

        });

        //Then display elements
        //Following line is to be replaced by something which select the display window
        let product;
        let p;
        const bodyElement = document.querySelector('body');
        for(let i = 0; i < elements.length ; i++)
        {
            //ONLY FOR TEST//
            product = elements[i];
            p = document.createElement('p');
            p.innerText = product.productName;
            bodyElement.appendChild(p);
        }
    }
}
