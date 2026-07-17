const AUTH_SESSION_KEY = 'authSession'

/**
 * 仅保存非敏感的登录状态标记。真正的认证凭据由后端写入 HttpOnly Cookie，
 * 前端 JavaScript 无法读取，从而降低 XSS 窃取令牌的风险。
 */
export const setAuthSession = (remember: boolean = false): void => {
  if (remember) {
    localStorage.setItem(AUTH_SESSION_KEY, '1')
    sessionStorage.removeItem(AUTH_SESSION_KEY)
  } else {
    sessionStorage.setItem(AUTH_SESSION_KEY, '1')
    localStorage.removeItem(AUTH_SESSION_KEY)
  }
}

export const clearAuthSession = (): void => {
  localStorage.removeItem(AUTH_SESSION_KEY)
  sessionStorage.removeItem(AUTH_SESSION_KEY)
  // 清理旧版本曾保存的明文令牌。
  localStorage.removeItem('accessToken')
  sessionStorage.removeItem('accessToken')
}

export const hasAuthSession = (): boolean => {
  // 升级到 Cookie 认证后，不再保留旧版本的 Bearer Token。
  localStorage.removeItem('accessToken')
  sessionStorage.removeItem('accessToken')
  return (
    localStorage.getItem(AUTH_SESSION_KEY) === '1' ||
    sessionStorage.getItem(AUTH_SESSION_KEY) === '1'
  )
}
