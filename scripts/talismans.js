function loadTalismans() {
  fetch("./talismans/talismans.json").then(response => response.json()).then(
    data => {
      var rarity = document.getElementById("rarity").value
      var arr = data[rarity]
      document.getElementById("talismans-table").innerHTML = ""
      for (let i = 0; i < arr.length; i++) {
        let row = `<tr><td><input type="radio" name="talisman" value="${i}" id="option-${i}" onclick="loadGroup(${i})"></td>`
        for (let j = 0; j < arr[i].groups.length; j++) {
          if (arr[i].groups[j] != "-") {
            row += `<td>Group ${arr[i].groups[j]}</td>`
          } else {
            row += `<td>-</td>`
          }
        }
        for (let j = 0; j < arr[i].slots.length; j++) {
          row += "<td>"
          for (let k = 0; k < arr[i].slots[j].length; k++) {
            if (arr[i].slots[j][k] == "W1") {
              row += `<img src="/images/${arr[i].slots[j][k]}.png" alt="weapon-1">`
            } else if (arr[i].slots[j][k] != 0) {
              row += `<img src="/images/a${arr[i].slots[j][k]}.png" alt="armor-${arr[i].slots[j][k]}">`
            }
          }
          row += "</td>"

        }
        for (let j = arr[i].slots.length; j < 4; j++) {
          row += "<td></td>"
        }

        row += "</tr>"
        document.getElementById("talismans-table").innerHTML += row
      }
    }
  )
}

function loadGroup(index) {
  fetch("./talismans/talismans.json").then(response => response.json()).then(
    talismans => {
      fetch("./talismans/groups.json").then(response => response.json()).then(
        groups => {
          var rarity = document.getElementById("rarity").value
          var talisman = talismans[rarity][index]
          document.getElementById("group-container").innerHTML = ""
          var table = ""
          for (let i = 0; i < talisman.groups.length; i++) {
            table = `<div class="group-table-container">
            <table>
              <thead>
                <tr>
                  <th colspan="3">Skill Group ${i + 1}</th>
                </tr>
                <tr>
                  <th></th>
                  <th>Skill</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
              `
            console.log(groups[talisman.groups[i]])
            for (let j = 0; j < groups[talisman.groups[i]].length; j++) {
              table += `
              <tr>
                <td><input type="radio" name="skill-group-${i + 1}"></td>
                <td>${groups[talisman.groups[i]][j].skill}</td>
                <td>${groups[talisman.groups[i]][j].level}</td>
              </tr>
              `
            }
            table += "</tbody></table></div>"
            document.getElementById("group-container").innerHTML += table
          }

        }
      )
    }
  )

}

window.onload = loadTalismans()