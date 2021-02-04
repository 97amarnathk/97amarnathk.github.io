import React from "react"

export function Dump(props) {
  return (
    <div class="w-max-sm">
      <div>
        {Object.entries(props).map(([key, val]) => (
          <pre key={key}>
            <strong>
              {key} ?
            </strong>
            {JSON.stringify(val, '', ' ')}
          </pre>
        ))}
      </div>
    </div>
  )
}