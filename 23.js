const PERIOD = 23;


const start = async function() {
  const provider = new ethers.providers.JsonRpcProvider('https://cloudflare-eth.com');

  const contract = new ethers.Contract("0x8f6287d024cc087b388f382a24193daa6087b5a4", [
    'function _rewardCounter() public view returns (uint256)',
    'function _lastWinner() public view returns (address)'
  ], provider)

  let count = await contract._rewardCounter()
  let lastWinner = await contract._lastWinner()

  let toGo = PERIOD - count;

  document.getElementById("current-count").innerHTML = count;
  document.getElementById("to-go").innerHTML = toGo.toString();
  document.getElementById("count-plural").innerHTML = toGo === 1 ? "" : "s";
  document.getElementById("last-address").innerHTML = lastWinner.substring(0, 7) + '....' + lastWinner.substring(lastWinner.length - 5, lastWinner.length)
}

start();
