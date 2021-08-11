import React, { Component, createRef } from 'react';

export class GraphicComponent extends Component {
  constructor() {
    super();
    this.canvasRef = createRef();
    this.legendCreate = this.legendCreate.bind(this);
    this.drawbackgound = this.drawbackgound.bind(this);
    this.drawBars = this.drawBars.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
  }

  componentDidMount() {
    this.drawbackgound();
  }

  componentDidUpdate() {
    this.clearCanvas();
    this.drawbackgound();
  }

  clearCanvas() {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawbackgound() {
    const {
      style: {
        widthGraph = '1000', heightGraph = '500', lineColor = 'black', fontSizeBackground = '10', widthLine = '1',
        fontBackground = 'monospace', percentSide = 'left',
      }, maxPercent = '100%',
    } = this.props;
    const sidePercent = percentSide === 'right' ? widthGraph - (fontSizeBackground * 4) : 10;
    const percent = maxPercent === '70%' ? 8 : maxPercent === '50%' ? 6 : 11;
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    const largeCent = heightGraph / (percent + 1);
    let pass = heightGraph - largeCent;
    let cents = 0;
    Array(percent).fill(0).forEach(() => {
      context.beginPath();
      context.strokeStyle = lineColor;
      context.lineWidth = widthLine;
      context.moveTo(0, pass);
      context.lineTo(widthGraph, pass);
      context.stroke();
      context.closePath();
      context.fillStyle = lineColor;
      context.font = `${fontSizeBackground}px ${fontBackground}`;
      context.fillText(`${cents}%`, sidePercent, pass - (widthLine * 2));
      pass -= largeCent;
      cents += 10;
    });
    this.drawBars();
  }

  drawBars() {
    const {
      style: {
        widthBar = '60', widthGraph = '1000', heightGraph = '500', fontSizeBar = '15', fontBar = 'monospace', maxPercent = '100%',
        fontColordifBar = false, fontColor = 'black', topPercent = false, withLegend = false, baseName = true,
      }, data = {}, colors = [],
    } = this.props;
    const canvas = this.canvasRef.current;
    const fontSize = +fontSizeBar || 20;
    const fontType = fontBar || 'serif';
    const percent = maxPercent === '70%' ? 8 : maxPercent === '50%' ? 6 : 11;
    const largeCent = heightGraph / (percent + 1);
    const context = canvas.getContext('2d');
    const keys = Object.keys(data);
    const total = Object.values(data).reduce((sum, crr) => sum + +crr, 0);
    const initBar = heightGraph - (heightGraph / (percent + 1));
    const pass = +widthBar / 2;
    const positionInt = (widthGraph / 2) - ((keys.length / 2) * (+widthBar + pass));
    let x = positionInt;

    keys.forEach((name, i) => {
      context.font = `${fontSize}px ${fontType}`;
      const percents = `${((+data[name] * 100) / total).toFixed(1)}%`;
      const cents = ((+data[name] * (10 * largeCent)) / total);
      context.fillStyle = colors[i] || '#aaa';
      context.fillRect(x, initBar, +widthBar, -cents);
      if (fontColordifBar) context.fillStyle = fontColor || 'black';
      if (baseName) context.fillText(name, x + (widthBar / 8), initBar + fontSize);
      if (topPercent) {
        context.fillText(percents, x + (widthBar / 4), initBar - cents - (fontSizeBar / 2));
      }
      x += (pass + +widthBar);
    });
    if (withLegend) this.legendCreate();
  }

  legendCreate() {
    const {
      style: {
        fontLegendSize = '20', borderLegend = '1', colorBorderLegend = 'black', colorLegend = 'white',
        fontLegend = 'monospace', widthGraph = '1000', fontColorLegend = 'black', legendSide = 'right',
        legendVertical = 'atop', heightGraph = '500',
      }, data = {}, colors = [],
    } = this.props;
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    const maxLength = Math.max(...Object.keys(data).map((val) => val.length)) * +fontLegendSize;
    const legendWith = maxLength + (+fontLegendSize * 5);
    const line = (+fontLegendSize + +fontLegendSize / 2);
    const legendHeight = (line * Object.keys(data).length) + (+fontLegendSize * 2);
    const xInit = legendSide === 'right' ? widthGraph - (legendWith + 10) : 10;
    const yInit = legendVertical === 'atop' ? 10 : heightGraph - (legendHeight + 10);
    context.fillStyle = colorBorderLegend;
    context.fillRect(
      xInit - borderLegend,
      yInit - borderLegend, legendWith + +borderLegend,
      legendHeight + +borderLegend,
    );
    context.fillStyle = colorLegend;
    context.fillRect(xInit, yInit, legendWith - +borderLegend, legendHeight - +borderLegend);
    const marginX = xInit + +fontLegendSize;
    let marginY = yInit + +fontLegendSize;
    colors.forEach((color) => {
      context.fillStyle = color;
      context.fillRect(marginX, marginY, fontLegendSize, fontLegendSize);
      marginY += +fontLegendSize + (+fontLegendSize / 2);
    });
    const textInitX = marginX + +fontLegendSize + +fontLegendSize / 2;
    let textY = yInit + (+fontLegendSize + +fontLegendSize - fontLegendSize / 6);
    const dataText = Object.keys(data);
    context.fillStyle = fontColorLegend;
    dataText.forEach((text) => {
      context.font = `${fontLegendSize}px ${fontLegend}`;
      context.fillText(text, textInitX, textY);
      textY += +fontLegendSize + (+fontLegendSize / 2);
    });
  }

  render() {
    const {
      style: {
        widthGraph = '1000', heightGraph = '500', backgroundColor = 'white', widthBorder = 1, borderColor = 'black',
      } = INITIAL_STATE,
    } = this.props;
    return (
      <canvas
        className="canvas"
        ref={this.canvasRef}
        width={widthGraph}
        height={heightGraph}
        style={{ border: `${widthBorder}px solid ${borderColor}`, backgroundColor }}
      />
    );
  }
}

GraphicComponent.defaultProps = {
  data: { data1: 6, data2: 4},
  colors: ['green', 'red'],
   maxPercent: '100%',
  style: {
    backgroundColor: 'white',
    lineColor: 'black',
    fontSizeBackground: '10',
    widthGraph: '1000',
    heightGraph: '500',
    widthBorder: '1',
    borderColor: 'black',
    widthLine: '1',
    fontBackground: 'monospace',
    percentSide: 'left',
    widthBar: '60',
    fontSizeBar: '15',
    fontBar: 'monospace',
    fontColordifBar: false,
    fontColor: 'black',
    topPercent: false,
    baseName: true,
    withLegend: false,
    fontLegend: 'monospace',
    fontLegendSize: '20',
    fontColorLegend: 'black',
    colorLegend: 'white',
    borderLegend: '1',
    colorBorderLegend: 'black',
    legendSide: 'right',
    legendVertical: 'atop',
  }
}

// export default GraphicComponent;
