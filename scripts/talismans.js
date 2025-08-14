function loadTalismans() {
  fetch("./talismans/talismans.json").then(response => response.json()).then(
    data => {
      rarity = document.getElementById("rarity").value
      console.log(data)
    }
  )
}

loadTalismans()