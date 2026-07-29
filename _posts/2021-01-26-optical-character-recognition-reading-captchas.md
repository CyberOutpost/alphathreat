---
layout: post
title: "DEFEATING CAPTCHAS: OPTICAL CHARACTER RECOGNITION"
date: 2021-01-26T19:04:00+05:30
categories: ["Hacking"]
description: "This blog post discuss the art of Optical Character Recognition and using it to read the Captchas. OPTICAL CHARACTER RECOGNITION (OCR) Simply stating Optical Character Recognition"
original_url: "https://blog.alphathreat.in/index.php?post/2021/01/26/Optical-Character-Recognition%3A-Reading-Captchas"
---

This blog post discuss the art of Optical Character Recognition and using it to read the Captchas.

## **OPTICAL CHARACTER RECOGNITION (OCR)**

Simply stating Optical Character Recognition (OCR) is the art of extracting text from images or any form of document.OCR can extract text from a scanned document or an image of a document.

## **CAPTCHA**

CAPTCHA stands for Completely Automated Public Turing test to tell Computers and Humans Apart. In other words, CAPTCHA determines whether the user is real or a spam robot. Below is what a form of captcha looks like

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>images.jpeg</code> was not captured by the Internet Archive.</p>

## **READING CAPTCHA (OR ANY TEXT FROM IMAGE)**

To read the captcha we will use a utility called as OCRopus. OCRopus is a collection of document analysis programs, not a turn-key OCR system. In order to apply it to your documents, you may need to do some image preprocessing, and possibly also train new models. It provides us utilities that helps in reading the images.

**WORKING MODEL**

Ocropus reads the image successfully once it is passed through the process of

**Binarization &gt; Page Layout Analysis &gt; Recognition**

or sometimes we need to train the model to recognise the parts of image, in that scenario the flow changes to:

**Binarization &gt; Page Layout Analysis &gt; Training &gt; Recognition**

The utilities used for the above process are mentioned below:

- **Binarization:** `ocropus-nlbin`
- **Page Layout Analysis:** `ocropus-gpageseg`
- **Training:** `ocropus-rtrain`
- **Rcognition:** `ocropus-rpred`

## **INSTALLING OCRopus**

In order to install OCRopus, fire up your terminal and issue below commmands:

```

$ git clone https://github.com/ocropus/ocropy
$ sudo apt-get install $(cat PACKAGES)
$ wget -nd https://github.com/zuphilip/ocropy-models/raw/master/en-default.pyrnn.gz
$ mv en-default.pyrnn.gz models/
$ sudo python setup.py install
```

## **READING CAPTCHA**

For our test we will try to read the below image (4.png), although it seems simple remember it has lot of black and white noise. And if you are unaware, this noise and extra characters serve the purpose of defeating OCR solutions.

**<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>4.png</code> was not captured by the Internet Archive.</p>**

- The first step is **Binarization**, in which OCRopus converts grayscale image to Black And White.

```

ocropus-nlbin -n images/4.png -o images/out
```

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>ocrpus-nlbin.png</code> was not captured by the Internet Archive.</p>

The result will be two png files in out directory as specified by the **-o** switch

- **images/out/0001.bin.png** (Useful flattened image) [top]
- **images/out/0001.nrm.png**   (Not so useful, non-flattened image) [bottom]

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>nlbin-output.png</code> was not captured by the Internet Archive.</p>

- The second step is **Page Layout Analysis** in which it tries to find the individual lines of text. You might need to play with the scale value to get the correct image.

```

ocropus-gpageseg -n -scale 45 images/out/0001.bin.png
```

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>page_layout_analysis.png</code> was not captured by the Internet Archive.</p>

This will give two files in output (the numbers could differ)

- `out/0001.pseg.png`
- `out/0001/0001/010001.bin.png`

- The third step **Recognition** involves reading the characters from image. Here we provide our downloaded english model via  **-m** switch

```

ocropus-rpread -n -m models/en-default.pyrnn.gz images/out/0001/010001.bin.png
```

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>output.png</code> was not captured by the Internet Archive.</p>

But unfortunately this did not give us the correct output. It was able to recognize only some parts of image , as you can see in red box it says **234zV**

Lets move back a step and try to teach our model the correct characters. We will be heading back to **Training** phase. In order to train the model, you need to create a file in the same folder from last step where your 010001.bin.png resides.

The file should say what captcha says, i.e. 263S2V

Name of the file should be same as our image and extension of .gt.txt

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>trainingFile.png</code> was not captured by the Internet Archive.</p>

Now lets start the training with ocropus-rtrain, Here we have t provide OCRopus what is called as Truthdata.

```

ocropus-rtrain -o models/testmodel images/out/0001/010001.bin.png
```

Here we are saving our model in models directory as testmodel with **-o** switch

You should get to train your model if you have lots of similar images. This is performed with just single image for demonstration purpose only.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>train_model.png</code> was not captured by the Internet Archive.</p>

In the output you will see three heading labelled as:

- **TRU** Truth data
- **ALN** Alternate of model output that is being aligned to model data
- **OUT** Output from the model

Keep it running for a while as it learns the characters. After every 1000 cycles it saves the modal in the filename specified. You can change that behavior by specifying the **-F** switch

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>afterawhile.png</code> was not captured by the Internet Archive.</p>

`After a while the output in TRU and OUT were same. Lets try to run the recognition again providing our model name`

```

ocropus-rpread -n -m models/testmodel-00001200.pyrnn.gz images/out/0001/010001.bin.png
```

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>result.png</code> was not captured by the Internet Archive.</p>

And now it recognizes the characters all fine.

Remember i performed this demonstration with just single image to explain the steps. You should train your models with multiple images.
