// index.ts
import axios from "axios";
var baseUrl = "https://headless.tebex.io";
async function Request(webstoreIdentifier, privateKey, method, identifier, route, path, params, body) {
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "boolean") {
        params[key] = value ? 1 : 0;
      }
    }
  }
  const config = {
    url: `${baseUrl}/api/${route}/${identifier}${path ?? ""}`,
    params,
    method,
    data: body,
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (webstoreIdentifier && privateKey) {
    config.auth = {
      username: webstoreIdentifier,
      password: privateKey
    };
  }
  const response = await axios.request(config);
  return response.data;
}
var TebexHeadless = class {
  constructor(webstoreIdentifier, privateKey) {
    this.webstoreIdentifier = webstoreIdentifier;
    this.privateKey = privateKey;
  }
  /**
   * @function getCategories
   * @description A function to get the categories from the Tebex Headless API
   *
   * @param {boolean} includePackages Whether to include the packages in the categories
   * @param {string} basketIdent The identifier of the basket
   * @param {string} ipAddress The IP address of the user
   *
   * @returns {Promise<Category[]>}
   */
  async getCategories(includePackages, basketIdent, ipAddress) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "get",
      this.webstoreIdentifier,
      "accounts",
      "/categories",
      {
        includePackages,
        basketIdent,
        ipAddress
      }
    );
    return data;
  }
  /**
   * @function getCategory
   * @description A function to get a category from the Tebex Headless API
   *
   * @param {number} id The ID of the category
   * @param {boolean} includePackages Whether to include the packages in the category
   * @param {string} basketIdent The identifier of the basket
   * @param {string} ipAddress The IP address of the user
   *
   * @returns {Promise<Category>}
   */
  async getCategory(id, includePackages, basketIdent, ipAddress) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "get",
      this.webstoreIdentifier,
      "accounts",
      `/categories/${id}`,
      {
        includePackages,
        basketIdent,
        ipAddress
      }
    );
    return data;
  }
  /**
   * @function apply
   * @description A function to apply a coupon, giftcard or creator code to a basket
   *
   * @param {A} body The body of the request
   * @param {string} basketIdent The identifier of the basket
   * @param {ApplyType} type The type of the apply request
   *
   * @returns {Promise<Message>}
   */
  async apply(basketIdent, type, body) {
    return await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "post",
      this.webstoreIdentifier,
      "accounts",
      `/baskets/${basketIdent}/${type}`,
      {},
      body
    );
  }
  /**
   * @function remove
   * @description A function to remove a coupon, giftcard or creator code from a basket
   *
   * @param {A} body The body of the request
   * @param {string} basketIdent The identifier of the basket
   * @param {ApplyType} type The type of the apply request
   *
   * @returns {Promise<Message>}
   */
  async remove(basketIdent, type, body) {
    return await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "post",
      this.webstoreIdentifier,
      "accounts",
      `/baskets/${basketIdent}/${type}/remove`,
      {},
      body
    );
  }
  /**
   * @function getPackage
   * @description A function to get a package from the Tebex Headless API
   *
   * @param {number} id The ID of the package
   * @param {string} basketIdent The identifier of the basket
   * @param {string} ipAddress The IP address of the user
   *
   * @returns {Promise<Package>}
   */
  async getPackage(id, basketIdent, ipAddress) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "get",
      this.webstoreIdentifier,
      "accounts",
      `/packages/${id}`,
      {
        basketIdent,
        ipAddress
      }
    );
    return data;
  }
  /**
   * @function getPackages
   * @description A function to get all packages from the Tebex Headless API
   *
   * @param {string} basketIdent The identifier of the basket
   * @param {string} ipAddress The IP address of the user
   *
   * @returns {Promise<Package[]>}
   */
  async getPackages(basketIdent, ipAddress) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "get",
      this.webstoreIdentifier,
      "accounts",
      `/packages`,
      {
        basketIdent,
        ipAddress
      }
    );
    return data;
  }
  /**
   * @function getBasket
   * @description A function to get a basket from the Tebex Headless API
   *
   * @param {string} basketIdent The identifier of the basket
   *
   * @returns {Promise<Package[]>}
   */
  async getBasket(basketIdent) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "get",
      this.webstoreIdentifier,
      "accounts",
      `/baskets/${basketIdent}`
    );
    return data;
  }
  /**
   * @function createBasket
   * @description A function to create a basket from the Tebex Headless API
   *
   * @param {string} complete_url The complete url
   * @param {string} cancel_url The cancel url
   * @param {KeyValuePair<string, any>} custom The custom object of the basket
   * @param {boolean} complete_auto_redirect Whether the basket should automatically redirect to the complete url
   * @param {string} ip_address The IP address of the user
   *
   * @returns {Promise<Basket>}
   */
  async createBasket(complete_url, cancel_url, custom, complete_auto_redirect, ip_address) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "post",
      this.webstoreIdentifier,
      "accounts",
      "/baskets",
      {
        ip_address
      },
      {
        complete_url,
        cancel_url,
        custom,
        complete_auto_redirect
      }
    );
    return data;
  }
  /**
   * @function createMinecraftBasket
   * @description A function to create a minecraft basket from the Tebex Headless API
   *
   * @param {string} username The username of the user
   * @param {string} complete_url The complete url
   * @param {string} cancel_url The cancel url
   * @param {KeyValuePair<string, any>} custom The custom object of the basket
   * @param {boolean} complete_auto_redirect Whether the basket should automatically redirect to the complete url
   * @param {string} ip_address The IP address of the user
   *
   * @returns {Promise<Basket>}
   */
  async createMinecraftBasket(username, complete_url, cancel_url, custom, complete_auto_redirect, ip_address) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "post",
      this.webstoreIdentifier,
      "accounts",
      "/baskets",
      {
        ip_address
      },
      {
        username,
        complete_url,
        cancel_url,
        custom,
        complete_auto_redirect
      }
    );
    return data;
  }
  /**
   * @function getBasketAuthUrl
   * @description A function to get the auth url of a basket from the Tebex Headless API
   *
   * @param {string} basketIdent The identifier of the basket
   * @param {string} returnUrl The return url of the basket
   *
   * @returns {Promise<AuthUrl[]>} The data returned or an axios error
   */
  async getBasketAuthUrl(basketIdent, returnUrl) {
    return await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "get",
      this.webstoreIdentifier,
      "accounts",
      `/baskets/${basketIdent}/auth`,
      {
        returnUrl
      }
    );
  }
  /**
   * @function addPackageToBasket
   * @description A function to add a package to a basket from the Tebex Headless API
   *
   * @param {string} basketIdent The identifier of the basket
   * @param {number} package_id The ID of the package
   * @param {number} quantity The quantity of the package
   * @param {PackageType} type The type of the package
   * @param {KeyValuePair<string, any>} variable_data The variable data of the package
   *
   * @returns {Promise<Basket>}
   */
  async addPackageToBasket(basketIdent, package_id, quantity, type, variable_data) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "post",
      basketIdent,
      "baskets",
      "/packages",
      {},
      {
        package_id,
        quantity,
        type,
        variable_data
      }
    );
    return data;
  }
  /**
   * @function giftPackage
   * @description A function to gift a package to a user from the Tebex Headless API
   *
   * @param {string} basketIdent The identifier of the basket
   * @param {number} package_id The ID of the package
   * @param {string} target_username_id The ID of the user to gift the package to
   *
   * @returns {Promise<Basket>}
   */
  async giftPackage(basketIdent, package_id, target_username_id) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "post",
      basketIdent,
      "baskets",
      "/packages",
      {},
      {
        package_id,
        target_username_id
      }
    );
    return data;
  }
  /**
   * @function removePackage
   * @description A function to remove a package from a basket from the Tebex Headless API
   *
   * @param {string} basketIdent The identifier of the basket
   * @param {number} package_id The ID of the package
   *
   * @returns {Promise<Basket>}
   */
  async removePackage(basketIdent, package_id) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "post",
      basketIdent,
      "baskets",
      "/packages/remove",
      {},
      {
        package_id
      }
    );
    return data;
  }
  /**
   * @function updateQuantity
   * @description A function to update the quantity of a package in a basket from the Tebex Headless API
   *
   * @param {string} basketIdent The identifier of the basket
   * @param {number} package_id The ID of the package
   * @param {number} quantity The quantity of the package
   *
   * @returns {Promise<Basket>}
   */
  async updateQuantity(basketIdent, package_id, quantity) {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "put",
      basketIdent,
      "baskets",
      `/packages/${package_id}`,
      {},
      {
        quantity
      }
    );
    return data;
  }
  /**
   * @function getWebstore
   * @description A function to get the webstore from the Tebex Headless API
   *
   * @returns {Promise<Webstore>}
   */
  async getWebstore() {
    const { data } = await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "get",
      this.webstoreIdentifier,
      "accounts"
    );
    return data;
  }
  /**
   * @interface updateTier
   * @description Update an tier of an package
   *
   * @param {unknown} tierId The ID of the tier
   * @param {number} package_id The ID of the package
   *
   * @returns {Promise<Message>}
   */
  async updateTier(tierId, package_id) {
    return await Request(
      this.webstoreIdentifier,
      this.privateKey,
      "patch",
      this.webstoreIdentifier,
      "accounts",
      `/tiers/${tierId}`,
      {},
      {
        package_id
      }
    );
  }
};
export {
  Request,
  TebexHeadless
};
