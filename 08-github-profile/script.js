const GITHUB_USER_API = 'https://api.github.com/users/'

const createUserCard = ({
    avatar_url,
    bio,
    name,
    followers,
    following,
    html_url,
    login,
    public_gists,
    public_repos
}) => {
    const $main = document.querySelector('#main')

    const cardHTML = `
        <div class="card">
            <header>
                <div>
                    <img
                        alt="${name}"
                        class="avatar"
                        src="${avatar_url}"
                    >
                </div>

                <div class="card__info-holder">
                    <h2 class="info__name">
                        ${name || ''}
                        <a
                            class="info__link"
                            href="${html_url}"
                            target="_blank"
                        >
                            @${login}
                        </a>
                    </h2>

                    <p class="info__bio">${bio || ''}</p>

                    <ul class="holder__info">
                        <li>
                            <strong>followers</strong>
                            ${followers}
                        </li>
                        <li>
                            <strong>following</strong>
                            ${following}
                        </li>
                        <li>
                            <strong>repos</strong>
                            ${public_repos}
                        </li>
                        <li>
                            <strong>gists</strong>
                            ${public_gists}
                        </li>
                    </ul>

                </div>
            </header>

            <h3 class="repos__title">Repositories</h3>
            <ul id="repos" class="holder__repos"></ul>
        </div>
    `

    $main.innerHTML = cardHTML
}

const addRepos = ({ description, name, html_url }) => {
    const $repos = document.querySelector('#repos')
    const $repo = document.createElement('li')
    $repo.classList.add('repo')
    
    $repo.innerHTML = `
        <a href="${html_url}" target="_blank">
            ${name}
        </a>
    `

    // if (description) {
    //     const $desc = document.createElement('p')
    //     $desc.innerText = description
    //     $repo.appendChild($desc)
    // }

    $repos.appendChild($repo)
}

const getRepos = async ({ repos_url }) => {
    const res = await fetch(repos_url + '?per_page=100&sort=updated')
    const data = await res.json()

    data.forEach(repo => addRepos(repo))
}

const getUser = async (user) => {
    const res = await fetch(GITHUB_USER_API + user)
    const data = await res.json()

    createUserCard(data)
    getRepos(data)
}

document.addEventListener('DOMContentLoaded', () => {
    const $searchForm = document.querySelector('#searchForm')
    const $searchInput = $searchForm.querySelector('#searchInput')

    $searchInput.value = ''

    $searchForm.addEventListener('submit', (evt) => {
        evt.preventDefault()

        const regex = /(<([^>]+)>)/gi
        const searchTerm = $searchInput.value.trim().replace(regex, "")

        if (searchTerm) {
            $searchInput.value = ''
    
            getUser(searchTerm)
        }
    })
})

getUser('learodrigo')
