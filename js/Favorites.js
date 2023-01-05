export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load()
  }

  load() {
    this.entries =
      [
        {
          userName: "maykbrito",
          name: "Mayk Brito",
          publicRepos: "76",
          followers: '1000'
        },
        {
          userName: "diego3g",
          name: "Diego Fernandes",
          publicRepos: "76",
          followers: '1000'
        }
      ]
  }

  delete(user) {
    const filteredEntries = this.entries
      .filter(entry => entry.userName !== user.userName)

    console.log(filteredEntries)
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries
      .forEach(user => {
        const row = this.createRow()
        row.querySelector('.users img')
          .src = `https://github.com/${user.userName}.png`

        row.querySelector('.name')
          .textContent = user.name

        row.querySelector('.userName')
          .textContent = user.userName

        row.querySelector('.repositories')
          .textContent = user.publicRepos

        row.querySelector('.followers')
          .textContent = user.followers

        row.querySelector('.action')
          .onclick = () => {
            const isOkay = confirm(`Tem certeza que deseja remover o ${user.name} de sua lista de Favoritos`)

            if (isOkay) {
              this.delete(user)
            }
          }

        this.tbody.append(row)
      })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
    <td class="users">
      <img class="imgProfile" src="https://github.com/JRebertt.png">
      <a href="https://github.com/JRebertt" target="_blank">
        <p class="name">João Rebertt</p>
        <span class="userName">/JRebertt</span>
      </a>
    </td>
    <td class="repositories">123</td>
    <td class="followers">1234</td>
    <td class="action">Remover</td>
  `
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr')
      .forEach((tr) => {
        tr.remove()
      })
  }
}