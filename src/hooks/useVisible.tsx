import { useEffect, useMemo, useState } from "react";

export function useVisible(ref: React.MutableRefObject<HTMLDivElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    [ref]
  );

  useEffect(() => {
    ref && observer.observe(ref.current as HTMLDivElement);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}

//Este hook foi criado para lidar com o botão de refresh que apresentava comportamento estranho caso o usuário
//já estivesse no topo da página. Tentei utilizar as funções utilizadas no arquivo useScroll, mas no meu
//entendimento utilizar um hook seria um pouco mais simples, e sem custos de performance extras
