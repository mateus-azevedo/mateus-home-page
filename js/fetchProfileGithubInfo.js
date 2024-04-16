/**
 *
 * @returns a object with github profile information
 * @example
 *  {
 *    "login": string,
 *    "id": number,
 *    "node_id": string,
 *    "avatar_url": string,
 *    "gravatar_id": string,
 *    "url": string,
 *    "html_url": string,
 *    "followers_url": string,
 *    "following_url": string,
 *    "gists_url": string,
 *    "starred_url": string,
 *    "subscriptions_url": string,
 *    "organizations_url": string,
 *    "repos_url": string,
 *    "events_url": string,
 *    "received_events_url": string,
 *    "type": string,
 *    "site_admin": false,
 *    "name": string,
 *    "company": string | null,
 *    "blog": string,
 *    "location": string,
 *    "email": string | null,
 *    "hireable": string | null,
 *    "bio": string,
 *    "twitter_username": string | null,
 *    "public_repos": number,
 *    "public_gists": number,
 *    "followers": number,
 *    "following": number,
 *    "created_at": string,
 *    "updated_at": string
 *  }
 */
async function fetchProfileGithubInfo() {
  try {
    const response = await fetch("https://api.github.com/users/mateus-azevedo");

    if (!response.ok) {
      throw new Error(
        `Error to fetch github profile informations. status code: ${response.status}`
      );
    }

    const github = await response.json();

    return github;
  } catch (err) {
    console.error(
      "The function fetchProfileGithubInfo didn't behave as expected. See the error details:",
      err
    );
  }
}

/**
 * Retrieve essential information for profile picture
 * @param {string} avatar_url expect a url with profile picture
 * @param {string} name expect a string with name
 */
function handleProfilePicture(avatar_url, name) {
  const profilePictureContainer = document.getElementById(
    "profile-picture-container"
  );
  const profilePicture = document.createElement("img");

  profilePicture.src = avatar_url;
  profilePicture.className = "profile-picture";
  profilePicture.alt = `${name} Profile Picture`;

  profilePictureContainer.appendChild(profilePicture);
}

/**
 * Provides a dynamic favicon according to the GitHub image profile
 * @param {string} avatar_url expect a url with profile picture
 * 
 * Implementation based on this guide:
 * https://spemer.com/articles/set-favicon-with-javascript.html
 */
function handleFaviconPage(avatar_url) {
  const headTag = document.querySelector('head');
  const setFavicon = document.createElement('link');

  setFavicon.setAttribute('rel', 'shortcut icon');
  setFavicon.setAttribute('href', avatar_url);
  headTag.appendChild(setFavicon);
}

/**
 * Retrieve nickname from GitHub
 * @param {string} login is the GitHub account identifier. (e.g. \@mateus-azevedo, \@Dougls99 and \@Rhuan-Gonzaga)
 * 
 * Also used to access the GitHub profile URL (e.g. https://github.com/mateus-azevedo)
 */
function handleGithubNickname(login) {
  const profilePictureContainer = document.getElementById(
    "profile-picture-container"
  );
  const nickname = document.createElement("p");

  nickname.textContent = `@${login}`;
  nickname.className = "github-nickname";
  nickname.alt = login;

  profilePictureContainer.appendChild(nickname);
}

fetchProfileGithubInfo().then((github) => {
  handleProfilePicture(github.avatar_url, github.name);
  handleFaviconPage(github.avatar_url);
  handleGithubNickname(github.login);
});
