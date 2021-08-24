const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal = input.value;
  const url = `https://www.dnd5eapi.co/api/spells/${inputVal}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.log("ERROR");
        const markup = `
        <div class="card" style="width:65%">
        <div class="card-body" style="text-center">
        <p>This didn't work. Try again. (Try putting dashes instead of spaces!)
        </p>
        </div>
        </div>`;
        document.querySelector(".card-space").innerHTML = markup;
      } else {
        const {
          index,
          name,
          desc,
          higher_level,
          range,
          components,
          material,
          ritual,
          duration,
          concentration,
          casting_time,
          level,
          attack_type,
          school,
          subclasses,
          classes
        } = data;

        let classString = "";
        classes.forEach(function(value, index) {
          let className = value.name;
          classString += value.name + ", ";
          // Remove comma after class - sometimes!
          if (index == classes.length - 1) {
            classString = classString.replace(/,\s*$/, " ");
          }
        });
        let subclassString = "";
        subclasses.forEach(function(value, index) {
          let subclassName = value.name;
          subclassString += value.name + ", ";
          // Remove comma after subclass - sometimes!
          if (index == subclasses.length - 1) {
            subclassString = subclassString.replace(/,\s*$/, " ");
          }
        });
        
        //  let schoolString = "";
        // school.forEach(function(value, index) {
        //   let schoolName = value.name;
        //   schoolString += value.name;
        // });
        // console.log('hola', schoolString);

        // Create card with info in .card-space
        const markup = `
        <div class="card" style="width:65%" >
          <div class="card-body">
          <h2>${(index, name)}</h2>
          <p>${desc}<p>
          <p><strong>At Higher Levels:</strong> ${higher_level}</p>
          <p><strong><div class="odd">Range:</strong> ${range}</div></p>
          <p><strong>Components:</strong>  ${components}</p>
          <p><strong><div class="odd">Material:</strong>  ${material}</div></p>
          <p><strong>Casting Time</strong>  ${casting_time}</p>
          <p><strong><div class="odd">Duration:</strong>  ${duration}</div></p>
          <p><strong>Concentration?</strong>  ${concentration}</p>
          <p><strong><div class="odd">Ritual?</strong> ${ritual}</div></p>
          <p><strong>Level:</strong> ${level}</p>
          <p><strong><div class="odd">Attack Type:</strong> ${attack_type}</div></p>
          <p><strong>Classes:</strong> ${classString}</p>
          <p><strong><div class="odd">Subclasses:</strong> ${subclassString}</div></p>
          </div>
          </div>
          `;

        //clear input after submit
        document.querySelector("input").value = null;
        document.querySelector(".card-space").innerHTML = markup;
      }
    })
    .catch(() => {
      console.log("this didnt work");
    });
});
