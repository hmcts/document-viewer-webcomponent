export class PdfData {
    public annotationData: [{
        annotation: string,
        type: string;
        color: string;
        rectangles: [
            {
                y: number,
                x: number,
                width: number,
                height: number
            }
        ];
        class: string;
        uuid: string;
        page: number;
        content: string;
    }];

//     [{"type":"highlight",
// "color":"FFFF00",
// "rectangles":[
//     {"y":188.85636867437145,"x":93.48291382753759,"width":14.738269318315318,"height":11.619946472626879}
//     ,{"y":188.85636867437145,"x":108.29630686824483,"width":72.81434482201597,"height":11.619946472626879}
// ],
// "class":"Annotation",
// "uuid":"c831162f-89ec-4890-ad8e-a57af0f0d2b7",
// "page":1},
// {"class":"Comment",
// "uuid":"5bb12ea4-2259-4612-83ba-7f69a9079643",
// "annotation":"c831162f-89ec-4890-ad8e-a57af0f0d2b7",
// "content":"A comment here"
// },{
//     "type":"highlight",
//     "color":"FFFF00",
//     "rectangles":
//     [
//         {"y":204.88721804511277,"x":115.25849077038298,"width":92.24449673989662,"height":11.619946472626879}
//     ],
//     "class":"Annotation",
//     "uuid":"9bac4cdc-0823-48be-9a19-f3550c437417",
//     "page":1
// }]
};