export const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    const decoded = JSON.parse(jsonPayload);
    return {
      id: decoded.sub, // Usando o sub como ID
      is_admin: decoded.isAdmin || false, // Padronizando para is_admin
      // Campos padrão para evitar erros
      nickname: decoded.nickname || `user_${decoded.sub.slice(0, 8)}`,
      avatar_url: decoded.avatar_url || null,
      email: decoded.email || null,
      // Mantendo outros campos do token
      ...decoded,
    };
  } catch (error) {
    console.error("Erro ao decodificar token JWT:", error);
    return null;
  }
};
