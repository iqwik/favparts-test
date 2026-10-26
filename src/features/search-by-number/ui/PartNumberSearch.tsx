import debounce from 'lodash-es/debounce'
import {useEffect, useEffectEvent, useMemo, useState} from 'react'

const EXAMPLE_NUMBERS = ['7160500039S', '01898', '53612/1', '01089']

type Props = {
  onSearch: (value: string) => void
  isLoading?: boolean
}

export function PartNumberSearch({onSearch, isLoading}: Props) {
  const [number, setNumber] = useState('')

  const applyNumber = useMemo(() => debounce(onSearch, 400), [onSearch])

  useEffect(() => () => applyNumber.cancel(), [applyNumber])

  const handleTagClick = useEffectEvent((value: string) => {
    setNumber(value)
    applyNumber.cancel()
    onSearch(value)
  })

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h5 card-title mb-3">Этап 1. Поиск производителей</h2>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="part-number" className="form-label">
            Артикул / номер детали <span className="text-danger">*</span>
          </label>
          <div className="input-group mb-2">
            <input
              id="part-number"
              className="form-control"
              placeholder="например, 7160500039S"
              value={number}
              onChange={e => {
                setNumber(e.target.value)
                applyNumber(e.target.value.trim())
              }}
              autoComplete="off"
            />
            {isLoading && (
              <span className="input-group-text">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </span>
            )}
          </div>
          <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <span className="text-muted small">Примеры:</span>
            {EXAMPLE_NUMBERS.map(example => (
              <button
                key={example}
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2"
                onClick={() => handleTagClick(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
