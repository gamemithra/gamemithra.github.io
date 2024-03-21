monogatari.script({
    // The game starts here.
    'Start': [
        'play music intro',
        'show scene kingdom with fadeIn duration 20s',
        'Once upon a time, in the ancient kingdom of Ayodhya',
        'ruled a noble and just king named Harishchandra.',
        'His reputation for honesty was renowned far and wide.',
        'But in this adaptation,the king\'s reputation is put to the test like never before',
        'show scene sabhagriham with fadeIn duration 20s',
        'As usual morning meeting with the king harishchandra was happenning ',
        ' Enter your name ?',
        //'show notification Welcome',
        {
            'Input': {
                'Text': 'What is your name?',
                'Validation': function (input) {
                    return input.trim().length > 0;
                },
                'Save': function (input) {
                    this.storage({
                        player: {
                            name: input
                        }
                    });
                    return true;
                },
                'Revert': function () {
                    this.storage({
                        player: {
                            name: ''
                        }
                    });
                },
                'Warning': 'You must enter a name!'
            }
        },

        'play sound guards_footsteps',
        ' a guard entering with a message.',
        '...',
        'stop sound guards_footsteps ',
        'show character y normal with ken-burn',

        'g:normal Your Majesty, a mysterious traveler seeks an audience with you.He claims to have a riddle that only a truly righteous king can solve?',
        'What shall you do, {{player.name}}, as you assume the role of King Harishchandra? ',
        {

            'Choice': {

                'Dialog': 'g What should I do sir?...',


                'Grant': {
                    'Text': 'Grant an audience ',
                    'Do': 'jump Grant'
                },
                'Decline': {
                    'Text': 'Decline the request ',
                    'Do': 'jump Decline'
                }
            }
        }
    ],

    'Grant': [
        'Bring the traveler before me. I shall hear their riddle and judge its worth.',
        'play sound guards_footsteps fade Out duration 1s',
        'show character t normal with ken-burn',
        "t May the king's reign be prosperous, his wisdom unending, and his kingdom forever at peace.",
        "t Your reputation for greatness has reached my ears, particularly regarding your unwavering honesty and dedication to the truth, sir.",
        'p I appreciate your kind words and am humbled by your recognition of my efforts. Upholding honesty and commitment to truth are principles I hold dear in my reign',
        'p kindly let me know your riddle',

        "t O King, here is my riddle: 'I am always hungry, I must always be fed. The finger I touch will soon turn red.' What am I?",
        {
            'Choice': {
                'Dialog': ' Now!',
                'Attempt to solve': {
                    'Text': 'Let me Answer ',
                    'Do': 'jump Attempt'
                },
                'Admit defeat: ': {
                    'Text': 'I am stumped. Your riddle is beyond my understanding.',
                    'Do': 'jump AdmitDefeat'
                }
            },

        }
    ],
       
    'Decline': [

        'y My time is valuable, and I have no interest in indulging in riddles. Send them away.',
        'end'
    ],

    'Attempt': [
        'p This riddle is indeed intriguing. If I may hazard a guess, I believe the answer is fire.',
        'Correct, King {{player.name}}. Your wisdom and insight are truly remarkable.',
        {
            'Choice': {
                'Dialog': 'Would you like to hear another riddle?',
                'Yes': {
                    'Text': 'Yes, please.',
                    'Do': 'jump AnotherRiddle'
                },
                'No': {
                    'Text': 'No, thank you.',
                    'Do': 'jump End'
                }
            }
        }


    ],
    
    'AdmitDefeat': [
        'p I must confess, this riddle has bested me. I am unable to discern its solution.',
        't Fear not, my lord. It is a challenging riddle indeed, and your honesty in admitting defeat speaks volumes of your character.',
        'end'
    ],
    
    'AnotherRiddle': [
        't Very well, here is another riddle for you, King {{player.name}}:',
        't "The more you take, the more you leave behind. What am I?"',
        {
            'Choice': {
                'Dialog': 'Now it is your turn, {{player.name}}. What shall be your response?',
                'Attempt to solve': {
                    'Text': 'Let me answer.',
                    'Do': 'jump Attempt2'
                },
                'Admit defeat': {
                    'Text': 'I am stumped once again. Please reveal the answer.',
                    'Do': 'jump AdmitDefeat2'
                }
            }
        }
    ],

    'Attempt2': [
        'p This riddle is quite thought-provoking. If I may venture a guess, I believe the answer is footsteps.',
        't Remarkable, King {{player.name}}. Your intelligence knows no bounds.',
        'end'
    ],
    
    'AdmitDefeat2': [
        'p Alas, I am unable to fathom the solution to this riddle. Please enlighten me.',
        't The answer to this riddle is footsteps, my lord. As you walk, you leave behind footsteps, and the more you walk, the more footsteps you leave.',
        'end'
    ],
    

    'End': [
        'end'
    ]
    
});