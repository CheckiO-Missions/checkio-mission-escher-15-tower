//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function towerCanvas(dom, input) {

            /*-----------------------------------
             *
             * one solution
             * 
             *-----------------------------------*/
            function tower(cubes) {

                function possibilities(cube) {
                    const [fr, rt, lf, bk, tp, bt] = cube;
                    return [[[fr, rt, bk, lf], tp, bt],
                            [[fr, bt, bk, tp], rt, lf],
                            [[bt, rt, tp, lf], fr, bk]];
                }
                
                function normalize([sides, top, bottom]){
                    const start_idx
                        = sides.indexOf(sides.slice().sort()[0]);
                    let aligned
                        = sides.slice(start_idx).concat(
                            sides.slice(0, start_idx));
                    if (aligned[1] > aligned[3]) {
                        [aligned[1], aligned[3]] = [aligned[3], aligned[1]];
                        [top, bottom] = [bottom, top];
                    }
                    return [aligned.join(''), top, bottom];
                }

                let result = [];
                const cube_obj = [];
                cubes.forEach(c=>{
                    cube_obj.push(possibilities(c).map(normalize));
                    result = result.concat(
                        cube_obj[cube_obj.length-1].map(c=>c[0]));
                });

                const dic = {};
                result.forEach(r=>{
                    if (! dic[r])
                        dic[r] = 0;
                    dic[r] += 1;
                });

                let most_sides = Object.keys(dic);
                const most_side
                    = most_sides.sort((a, b)=>dic[a]-dic[b]).reverse()[0];
                const tops = [];
                cube_obj.forEach(cube=>{
                    cube.forEach(p=>{
                        if (p[0] === most_side)
                            tops.push(p[1]);
                    });
                });

                return [most_side, tops, tops.length];
            }

            /*----------------------------------------------*
             *
             * hyper cube (draw)
             *
             *----------------------------------------------*/
            const scale = 1.4;
            const attr = {
                edge: {
                    'stroke-width': 0.5,
                    'stroke': 'white',
                },
                color_text: {
                    'font-family': 'robot',
                    'font-size': 7*scale + 'px',
                },
                A: { 'fill': '#007FFF', },
                B: { 'fill': 'rgb(33,89,207)', },
                C: { 'fill': 'rgb(170,232,238)', },
                G: { 'fill': 'rgb(117,176,124)', },
                R: { 'fill': 'rgb(215,24,15)', },
                S: { 'fill': '#EA5532', },
                V: { 'fill': 'rgb(157,140,217)', },
                Y: { 'fill': 'rgb(241,241,158)', },
                O: { 'fill': 'rgb(249,185,121)', },
                W: { 'fill': '#FFFFFF', },
            };
            const os = 16;
            const cb = input
            let [sides, tops, height]  = tower(cb);

            const paper = Raphael(dom, 32*scale+os*2, 
                32+(20*scale*height)+os*2, 0, 0);
            const top = tops[Math.floor(Math.random(1)*tops.length)];
            const s = Math.floor(Math.random(1)*sides.length);
            sides = sides.slice(s) + sides.slice(0, s);

            //top
            paper.path('m' + (os) + ',' + (16+os) 
                    + ' l' + (16*scale) + ',' + (-8*scale) 
                    + ' l' + (16*scale) + ',' + (8*scale) 
                    + ',l' + (-16*scale) + ',' + (8*scale) + 'z').attr(
                        attr[top]).attr(attr.edge);
            paper.text(16*scale+os, 16+os, top).attr(attr.color_text);

            for (let i=0; i < height; i += 1) {

                // left side
                paper.path('m' + (os) + ',' + (16+((16+4)*i*scale)+os)
                    + ' l' + (16*scale) + ',' + (8*scale)
                    + ' l' + (0*scale) + ',' + ((16+4)*scale)
                    + ' l' + (-16*scale) + ',' + (-8*scale) + 'z').attr(
                        attr[sides[0]]).attr(attr.edge);

                // right side
                paper.path('m' + (32*scale+os) + ','
                        + (16+((16+4)*i*scale)+os) 
                        + ' l' + (-16*scale) + ',' + (8*scale) 
                        + ' l' + (0*scale) + ',' + ((16+4)*scale) 
                        + ' l' + (16*scale) + ',' + (-8*scale) + 'z').attr(
                            attr[sides[1]]).attr(attr.edge);

                paper.text(8*scale+os, 
                    (16+(16+4)*i*scale)+os+(12+1)*scale, sides[0]).attr(
                        attr.color_text);

                paper.text((32-8)*scale+os,
                    (16+(16+4)*i*scale)+os+(12+1)*scale, sides[1]).attr(
                        attr.color_text);
            }
        }
        
        var $tryit;

        var io = new extIO({
            multipleArguments: false,
            functions: {
                python: 'tower',
                js: 'tower'
            },
            animation: function($expl, data){
                towerCanvas($expl[0],
                    data.in);
            }
        });
        io.start();
    }
);
