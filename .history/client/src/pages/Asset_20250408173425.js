{assetAmount > 0.0001 && (
    <div className="asset-actions">
      <button onClick={() => window.location.href=`/withdraw?asset=${asset}`}>Withdraw</button>
      <button onClick={() => window.location.href=`/receive?asset=${asset}`}>Receive</button>
      <button onClick={() => window.location.href=`/send?asset=${asset}`}>Send</button>
    </div>
  )}
  