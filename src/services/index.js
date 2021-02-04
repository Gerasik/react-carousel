function unique(arr) {
  return Array.from(new Set(arr));
}

function gerSrc(element) {
  const re = /\ssrc=(?:(?:'([^']*)')|(?:"([^"]*)")|([^\s]*))/i;
  const res = element.match(re);
  return res[1] || res[2] || res[3];
}

export function ejectScriptsFromData(data) {
  const newData = data.map((item) => {
    const script = /<script[\s\S]*<\/script>/gi.exec(item);
    return {
      str: item.replace(script[0], ""),
      script,
    };
  });
  return {
    updatedData: newData.map((item) => item.str),
    scripts: newData.map((item) => item.script[0]),
  };
}

export function runScript(scripts) {
  unique(scripts).forEach((element) => {
    const script = document.createElement("script");
    script.src = gerSrc(element);
    script.async = true;
    document.body.appendChild(script);
  });
}
