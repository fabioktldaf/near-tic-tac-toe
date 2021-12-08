import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import getConfig from "./config";

const nearConfig = getConfig("testnet");

const lsGameKey = "tic-tac-toc-game";

const initContract = async () => {
  window.near = await connect(
    Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig)
  );

  window.nearConfig = nearConfig;
  window.nearWallet = new WalletConnection(near);
  window.nearUser = window.nearWallet.getAccountId();
  const contract = await new Contract(window.nearWallet.account(), nearConfig.contractName, {
    viewMethods: ["getGame"],
    changeMethods: ["createGame", "play", "joinGame"],
  });

  return contract;
};

const logout = () => {
  window.nearWallet.signOut();
  window.location.replace(window.location.origin + window.location.pathname);
};

const login = () => window.nearWallet.requestSignIn(nearConfig.contractName);

const loadGameStatus = () => {
  const strLsStatusGame = window.localStorage.getItem(lsGameKey);

  return strLsStatusGame?.length > 0
    ? JSON.parse(strLsStatusGame)
    : {
        squares: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        player1: "",
        player2: "",
        nextMovePlayer: "",
        winner: "",
        status: -1,
        gameId: -1,
      };
};

const saveGameStatus = (game) => window.localStorage.setItem(lsGameKey, JSON.stringify(game));

export { initContract, logout, login, loadGameStatus, saveGameStatus };
