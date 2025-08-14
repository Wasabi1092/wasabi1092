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
            table = `<div class="group-table-container" onclick="updateSkills()">
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
                <td><input type="radio" name="skill-group-${i + 1}" value="${groups[talisman.groups[i]][j].skill} ${groups[talisman.groups[i]][j].level}"></td>
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

function updateSkills() {
  var group1 = document.getElementsByName("skill-group-1")
  var group2 = document.getElementsByName("skill-group-2")
  var group3 = document.getElementsByName("skill-group-3")
  fetch("./talismans/talismans.json").then(response => response.json()).then(
    talismans => {
      var rarity = document.getElementById("rarity").value
      var arr = talismans[rarity]
      var index;
      var selectors = document.getElementsByName("talisman")
      for (let i = 0; i < selectors.length; i++) {
        if (selectors[i].checked) {
          index = i
          break
        }
      }
      let obj;
      document.getElementById("image-containers").innerHTML = ""
      for (let i = 0; i < arr[index].slots.length; i++) {
        obj = `<div class="image-container">`
        for (let j = 0; j < arr[index].slots[i].length; j++) {
          if (arr[index].slots[i][j] == "W1") {
            obj += `<img src="/images/${arr[index].slots[i][j]}.png" alt="weapon-1">`
          } else if (arr[index].slots[i][j] != 0) {
            obj += `<img src="/images/a${arr[index].slots[i][j]}.png" alt="armor-${arr[index].slots[i][j]}">`
          }
        }
        obj += `</div>`
        document.getElementById("image-containers").innerHTML += obj
      }

      document.getElementById("list").innerHTML = ""
      let skills = []
      for (let i = 0; i < group1.length; i++) {
        if (group1[i].checked) {
          skills.push(group1[i].value)
          break
        }
      }
      for (let i = 0; i < group2.length; i++) {
        if (group2[i].checked) {
          skills.push(group2[i].value)
          break
        }
      }
      for (let i = 0; i < group3.length; i++) {
        if (group3[i].checked) {
          skills.push(group3[i].value)
          break
        }
      }
      for (let i = 0; i < skills.length; i++) {
        document.getElementById("list").innerHTML += `<li>${skills[i]}</li>`
      }
    }
  )
}

window.onload = loadTalismans()