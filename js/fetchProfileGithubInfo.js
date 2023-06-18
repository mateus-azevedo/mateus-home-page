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
 */
const profilePicture = document.createElement("img");
fetchProfileGithubInfo().then(github => {
  profilePicture.src = github.avatar_url;
  profilePicture.className = "profile-picture";
  profilePicture.alt = `${github.name} Profile Picture`
});

const profilePictureContainer = document.getElementById(
  "profile-picture-container"
);
profilePictureContainer.appendChild(profilePicture);

