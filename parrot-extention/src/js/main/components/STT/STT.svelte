<script>
/* var replicat output = {
    "id": "xsyitubbyg7ik7mollqa6xl3ni",
    "model": "openai/whisper",
    "version": "4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2",
    "input": {
        "audio": "https://replicate.delivery/mgxm/e5159b1b-508a-4be4-b892-e1eb47850bdc/OSR_uk_000_0050_8k.wav"
    },
    "logs": "Transcribe with large-v3 model.\nDetected language: English\n  0%|          | 0/5241 [00:00<?, ?frames/s]\n 35%|███▌      | 1860/5241 [00:02<00:05, 634.50frames/s]\n 93%|█████████▎| 4860/5241 [00:08<00:00, 596.97frames/s]\n100%|██████████| 5241/5241 [00:09<00:00, 536.44frames/s]\n100%|██████████| 5241/5241 [00:09<00:00, 559.61frames/s]\n",
    "output": {
        "detected_language": "english",
        "segments": [
            {
                "avg_logprob": -0.060722851171726135,
                "compression_ratio": 1.412280701754386,
                "end": 18.6,
                "id": 0,
                "no_speech_prob": 0.05907342955470085,
                "seek": 0,
                "start": 0,
                "temperature": 0,
                "text": " the little tales they tell are false the door was barred locked and bolted as well ripe pears are fit for a queen's table a big wet stain was on the round carpet",
                "tokens": [
                    50365,
                    264,
                    707,
                    27254,
                    436,
                    980,
                    366,
                    7908,
                    264,
                    2853,
                    390,
                    2159,
                    986,
                    9376,
                    293,
                    13436,
                    292,
                    382,
                    731,
                    31421,
                    520,
                    685,
                    366,
                    3318,
                    337,
                    257,
                    12206,
                    311,
                    3199,
                    257,
                    955,
                    6630,
                    16441,
                    390,
                    322,
                    264,
                    3098,
                    18119,
                    51295
                ]
            },
            {
                "avg_logprob": -0.1184891973223005,
                "compression_ratio": 1.696969696969697,
                "end": 31.840000000000003,
                "id": 1,
                "no_speech_prob": 0.000253104604780674,
                "seek": 1860,
                "start": 18.6,
                "temperature": 0,
                "text": " the kite dipped and swayed but stayed aloft the pleasant hours fly by much too soon the room was crowded with a mild wab",
                "tokens": [
                    50365,
                    264,
                    38867,
                    45162,
                    293,
                    27555,
                    292,
                    457,
                    9181,
                    419,
                    6750,
                    264,
                    16232,
                    2496,
                    3603,
                    538,
                    709,
                    886,
                    2321,
                    264,
                    1808,
                    390,
                    21634,
                    365,
                    257,
                    15154,
                    261,
                    455,
                    51027
                ]
            },
            {
                "avg_logprob": -0.1184891973223005,
                "compression_ratio": 1.696969696969697,
                "end": 45.2,
                "id": 2,
                "no_speech_prob": 0.000253104604780674,
                "seek": 1860,
                "start": 31.840000000000003,
                "temperature": 0,
                "text": " the room was crowded with a wild mob this strong arm shall shield your honour she blushed when he gave her a white orchid",
                "tokens": [
                    51027,
                    264,
                    1808,
                    390,
                    21634,
                    365,
                    257,
                    4868,
                    4298,
                    341,
                    2068,
                    3726,
                    4393,
                    10257,
                    428,
                    20631,
                    750,
                    25218,
                    292,
                    562,
                    415,
                    2729,
                    720,
                    257,
                    2418,
                    34850,
                    327,
                    51695
                ]
            },
            {
                "avg_logprob": -0.1184891973223005,
                "compression_ratio": 1.696969696969697,
                "end": 48.6,
                "id": 3,
                "no_speech_prob": 0.000253104604780674,
                "seek": 1860,
                "start": 45.2,
                "temperature": 0,
                "text": " the beetle droned in the hot june sun",
                "tokens": [
                    51695,
                    264,
                    49735,
                    1224,
                    19009,
                    294,
                    264,
                    2368,
                    361,
                    2613,
                    3295,
                    51865
                ]
            },
            {
                "avg_logprob": -0.7403042793273926,
                "compression_ratio": 0.5294117647058824,
                "end": 52.4,
                "id": 4,
                "no_speech_prob": 0.292143315076828,
                "seek": 4860,
                "start": 48.6,
                "temperature": 0.2,
                "text": " thank you",
                "tokens": [
                    50365,
                    1309,
                    291,
                    50555
                ]
            }
        ],
        "transcription": " the little tales they tell are false the door was barred locked and bolted as well ripe pears are fit for a queen's table a big wet stain was on the round carpet the kite dipped and swayed but stayed aloft the pleasant hours fly by much too soon the room was crowded with a mild wab the room was crowded with a wild mob this strong arm shall shield your honour she blushed when he gave her a white orchid the beetle droned in the hot june sun thank you",
        "translation": null
    },
    "error": null,
    "status": "succeeded",
    "created_at": "2024-03-03T19:45:50.088178Z",
    "started_at": "2024-03-03T19:45:50.108989Z",
    "completed_at": "2024-03-03T19:46:00.20845Z",
    "urls": {
        "cancel": "https://api.replicate.com/v1/predictions/xsyitubbyg7ik7mollqa6xl3ni/cancel",
        "get": "https://api.replicate.com/v1/predictions/xsyitubbyg7ik7mollqa6xl3ni"
    },
    "metrics": {
        "predict_time": 10.099461
    }
}
*/

    const ApiToken = "uat.AE0qMPk3EXskYMEQ48ygOMLdgfJP49pZWcxibXJH0LskMrjkq8qEGyLbx2mUEvlraPyzrZDOooTOHbA1rpJa1w9g7rJzterADU3cQisDJnvD8XmJU-Vw7N3yJuai_3uRZJc66sTuMMDONyIvB8Qb1cIetxQGvqmRDUwnUrwksnmAO4oLeO3si54_NPxTEbBpIrVzScy-0bPeTPbI5gB5tVi-RTOUnqI_KxIxjczlkH-_kNxFV_vZcyx5ucVrVJ17LWDV9JbjliCwK-K-DzNWZ9ufpbe0rvn5hWpk-Rh8jAC56NDZhmPWrpYIfhMkO4giyA_7ZOVpIlOmOS0MrQW8Z_VyEU2ejfWqGqZmchB3tUT6bFJ64YWS6sgF4xVQd8Z-hTlOgU-mFA6YrEzRKcifBveMyFCUJTsSz_BWhxa5-jGG2rL1Nt2G5Y04gv8_ELuCjxFgDkesQomHQywtr_jP-lk1Wh1ffp0CMjQhMK0UcXAyIFX4D-HsK044BnsyjmV02eAqRmJ6vKayBs3k4OFe3UzfzsKgBMTsJFv2qXIlEIgweJQQTJWmfWJdTlDWkQKzQCvluOG0OxrtPHhsMEZRGA-Oa8pZitXnUGVildOqy2bMVNvvJXfnJwgcYVIaM3KN2OS97fHbw9ZzD-xoR-b8E5sHoiEHXknbd2mRFWkhDGKR1rE2iqqoqvpTI9M8kPt5smqoPdmFomUKGYi-qQ6q6R1y-U5E1TMyrwf4PNxOsoz71HS57DTH7e2_ivb-GzfEoROIGIMWGEYYcUs0-oSFIoRf2OuhCyEgwbCPgNvBeDmudiqZMFEZYjgELwOwzcupE_gKsKxF0U0mfcYLDnD9iVLlquV5STPzAFWxjUJcPmkJcQUw-zyvgYph2vBUG0uwsXGizr4lEHpdEkL0KthI9XwS6uzO6kHwdk0kVje8uPCKRxYAqkjAhbj89PtNoMOYpK_ryjej_K5npVPhCpKwUvUdgH-Vhvsc5zg6JmvopXODExWpifZ9MW5v6qcLqaT1rYIFUYnNU8Lw7hPLUw2fQ7y6axQwkmb9q1ByF1r8S_T5u7Ax4R_zm2QLFHbcFqDgZThk4-3iKVhvus6M_BOFBXcWO1sg8wuMMBw0B3OP1Qrsnon3Qj1sQ2kVW8w3kh4PEBwfjqSpTyU8hOj-vAYyo6IZe6Z9uV9xUUcJpPC--c2ckqt0ESCld6HGSo-sgdm9Xe6G1FhwlGB1NkV3asMWE0mhi2Yj3Mzb800m1gDUgJSwzDa7hvyA-faD-ft3EkDLRimwluOHkL2gSfBufX08JJh1NDtHF-rwNaoW2Q20b_xgsA"

    import { STT_Language } from '../../../lib/utils/types';
    import './STT.scss';
    

    
    var file;
    var language;
    var task;


    const setFile = async (inputFile) => {
        file = inputFile
    }

    const  onSubmitClicked = async () => {
        language = document.getElementById('select-language').value
        const result = await uploadFile(file)
        alert(JSON.stringify(result.url))
        task = JSON.stringify(result)

    }

    // upload file using dropbox v2 api
    const uploadFile = async (input) => {
        const url = 'https://content.dropboxapi.com/2/files/upload';
        const token = 'Bearer ' + ApiToken;
        const headers = {
            'User-Agent': 'api-explorer-client',
            'Authorization': token,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
                path: '/parrot-extention/' + input.name,
                mode: 'add',
                autorename: true,
                mute: false
            })
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: input
        });
        const data = await response.json();
        return data;
    }
</script>

<div class="stt-main hidden">
    <h1>Speech To Text</h1>
    <input type='file' on:change={(e) => {setFile(e.target.files?.[0])}}/>
    
    <div>
        <select id="select-language">
            {#each STT_Language as sst_language}
                <option>
                    {sst_language.audioLanguage}
                </option>
            {/each}
        </select>
    </div>

    <button on:click = {onSubmitClicked}>Generate</button>

    <!-- {#if fileURL}
    <audio controls>
        <source src={fileURL}/>
    </audio>
    {/if} -->
    <p>{task}</p>

</div>
