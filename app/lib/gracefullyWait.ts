export default function gracefullyAwait(ms = 2000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
