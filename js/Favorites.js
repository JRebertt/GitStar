import { GithubUser } from "./GithubUser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load()

  }

  load() {

    this.entries = JSON.parse(
      localStorage.getItem('@github-favorites:')
    ) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {

      const userExists = this.entries.find(entry => entry.login === username)

      if (userExists) {
        throw new Error('Usuario já cadastrado')
      }

      const user = await GithubUser.search(username)

      console.log(user)

      if (user.login === undefined) {
        throw new Error('Usuario Não encontrado')
      }
      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    } catch (err) {
      alert(err.message)
    }
  }

  delete(user) {
    const filteredEntries = this.entries
      .filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onadd()

  }

  onadd() {
    const addButton = this.root.querySelector('.ButtonSearch')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search')
      this.add(value)
    }
  }

  update() {
    this.removeAllTr()

    this.entries
      .forEach(user => {
        const row = this.createRow()
        row.querySelector('.users img')
          .src = `https://github.com/${user.login}.png`

        row.querySelector('.name')
          .textContent = user.name

        row.querySelector('a')
          .href = `https://github.com/${user.login}`

        row.querySelector('.userName')
          .textContent = user.login

        row.querySelector('.repositories')
          .textContent = user.public_repos

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