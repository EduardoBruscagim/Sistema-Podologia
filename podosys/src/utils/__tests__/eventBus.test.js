import { describe, it, expect, vi } from 'vitest'
import { eventBus } from '../eventBus.js'

describe('eventBus', () => {
  it('should call listener when event is emitted', () => {
    const callback = vi.fn()
    eventBus.on('test', callback)

    eventBus.emit('test', 'hello')

    expect(callback).toHaveBeenCalledWith('hello')
    expect(callback).toHaveBeenCalledTimes(1)

    eventBus.off('test', callback)
  })

  it('should support multiple listeners on same event', () => {
    const cb1 = vi.fn()
    const cb2 = vi.fn()

    eventBus.on('multi', cb1)
    eventBus.on('multi', cb2)

    eventBus.emit('multi', 42)

    expect(cb1).toHaveBeenCalledWith(42)
    expect(cb2).toHaveBeenCalledWith(42)

    eventBus.off('multi', cb1)
    eventBus.off('multi', cb2)
  })

  it('should not call listener after off()', () => {
    const callback = vi.fn()
    eventBus.on('remove-test', callback)
    eventBus.off('remove-test', callback)

    eventBus.emit('remove-test', 'data')

    expect(callback).not.toHaveBeenCalled()
  })

  it('should return unsubscribe function from on()', () => {
    const callback = vi.fn()
    const unsubscribe = eventBus.on('unsub-test', callback)

    unsubscribe()
    eventBus.emit('unsub-test', 'data')

    expect(callback).not.toHaveBeenCalled()
  })

  it('should not throw when emitting event with no listeners', () => {
    expect(() => eventBus.emit('nonexistent', 'data')).not.toThrow()
  })

  it('should isolate events by name', () => {
    const cb = vi.fn()
    eventBus.on('event-a', cb)

    eventBus.emit('event-b', 'data')

    expect(cb).not.toHaveBeenCalled()
    eventBus.off('event-a', cb)
  })
})
