---
layout: post
title: How to make a simple (but powerful!) news bulletin box in Unity!
date: 2022-01-07
categories: ["tutorials","unity"]
toc: true
comments: true
---

# Hey there!

Thanks for checking out this post! In this post I'm going to show how to make something similar to this!



![infobox]({{ site.baseurl }}/assets/uploads/hV2AIBi.png)
>Before we get started I just have to say that I am making use of a webhosting provider.
>It's not required, but you'll see why I'm doing this once we're done!




#### In Editor

To begin with, Let's open a new scene and add in a TextMeshPro Object and attach a new script.

#### Unity Docs


Head to the [Unity docs here](https://docs.unity3d.com/Manual/UnityWebRequest-RetrievingTextBinaryData.html) <br>
In the docs we're going to use this snippet at the bottom of the page

```cs

using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

public class MyBehaviour : MonoBehaviour {
    void Start() {
        StartCoroutine(GetText());
    }

    IEnumerator GetText() {
        UnityWebRequest www = UnityWebRequest.Get("https://www.my-server.com");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success) {
            Debug.Log(www.error);
        }
        else {
            // Show results as text
            Debug.Log(www.downloadHandler.text);

            // Or retrieve results as binary data
            byte[] results = www.downloadHandler.data;
        }
    }
}
```

Alright, so what this does is it makes a webrequest to where ever you aim it and if the webrequest can't connect it will throw an error otherwise it will display the webrequests data, But we're going to make some changes.


#### Changes to the script

```cs

using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

public class MyBehaviour : MonoBehaviour {

    public TextMeshProUGUI textMeshPro;
    public float timer = 60.0f;

    private void Start()
    {
        StartCoroutine(GetText());
    }

    void Update()
    {
        timer -= Time.deltaTime;
        if(timer <= 0)
        {
            timer = 60.0f;
            StartCoroutine(GetText());
        }
    }

    IEnumerator GetText()
    {
        UnityWebRequest www = UnityWebRequest.Get("YOURWEBHOST.COM/news.txt");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.LogFormat("MENU DATA REQUEST: <color=green>{0}</color>", www.result);
            // Show results as text
            GetComponent<MarkdownRenderer>().Source = www.downloadHandler.text;
            // Or retrieve results as binary data
            byte[] results = www.downloadHandler.data;
        }
    }
}
```

So it's very similar, the only difference is that we've added a few variables and a new function.

Now, what are the changes?

The `textMeshpro` variable is a TextMeshPro Object that we will use to render the downloaded text.<br>
The `timer` variable is a float that we will use to make a timer so that we dont spam the host with webrequests. The value is seconds.<br>
`Update` is a function that is called every frame which is why we are using the timer. If we didn't use the timer we would be grabbing the data from the url every frame resulting in your webhost blocking your IP, Not good! <br>
In `Update` we  subtract 1 from `timer` every second and once `timer` reaches a value less than or equal to 0 it will reset `timer` back to 60 and call our Coroutine.

We changed a few other things in the `GetText` coroutine, firstly the `www` variable is just aiming to a text document which has some text in it. You can point this to any url that has a public text document.

Now we could just do `textMeshPro.text = www.downloadHander.text;` and you could stop there and use [rich text](https://docs.unity3d.com/462/Documentation/Manual/StyledText.html) to format and color your text. Well, Richtext is great but it can get messy super quickly which is why I love [Markdown](https://www.markdownguide.org/cheat-sheet/).
This post is made with Markdown infact!
So I found this asset [https://github.com/JimmyCushnie/FancyTextRendering](https://github.com/JimmyCushnie/FancyTextRendering) and now you can use Markdown in Unity (mostly)!

So if you noticed above we have `GetComponent<MarkdownRenderer>.Source = www.downloadHandler.text;`
Well, if you just add the `MarkdownRenderer` component from the new asset to the text that this current component is added on the downloaded text will render Markdown *and* Richtext!

So for example in the text document you could do something like

```markdown
# Patch notes!
### Inventory UI
<color="green">
 - Brand new UI!
 - Stats display for each item
 - Consumables show how much they heal
</color>

### AI
<color="green">
 - AI now wanders around
 - AI only attacks if player is in range and is at the end of it's destination
</color>

### Item Changes
<color="red"> - Decreased Axe to 5 damage</color>
<color="green"> - Increased Bow to 3 damage</color>
<color="green"> - Apple Increased to +25hp</color>
```

And that would render as <br>
![infobox]({{ site.baseurl }}/assets/uploads/hV2AIBi.png)

The cool thing is that this is all using **one** TextMeshPro object **AND** you can change the text at runtime! So since we're using our webserver to host the text file, I could change the text from my phone or any device and the changes would show in game!


### Voila! Now you have a news bulletin!
<br>
<br>




---
>Written by: [{{site.data.author.name}}](https://www.nativvstudios.com/blog/)
>GitHub [Nativvstudios](https://github.com/nativvstudios)
>Twitter [@Whyherro1](https://twitter.com/whyherro1)
