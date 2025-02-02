import * as prismic from "@prismicio/client";
import { useState, useEffect } from "react";
import { htmlAsRichText } from "@prismicio/migrate";

const repoName = "verto-homes";
const writeClient = prismic.createWriteClient(repoName, {
  writeToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6InZlcnRvLWhvbWVzLWI0NmY2YjlkLTc4MmItNDVmNi04YjJmLThmNGMzOTM1ZmQzZV81IiwiZGF0ZSI6MTczODI2MjI2MSwiZG9tYWluIjoidmVydG8taG9tZXMiLCJhcHBOYW1lIjoiVmVydG9Ib21lc0ltcG9ydCIsImlhdCI6MTczODI2MjI2MX0._gR_JMCO0TS4XdM0N66jRGCN_941eNowKW-0VguXEBY",
});

const migration = prismic.createMigration();

const wordpressApiUrl =
    "https://vertohomes.com/wp-json/wp/v2/posts?per_page=100";

      try {
        const response = await fetch(wordpressApiUrl);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();

        try {
            //const postsToProcess = data.slice(0, 1);
            for(const postData of data) {
                console.log(postData.title.rendered);


                migration.createDocument(
                {
                    type: "article", // Prismic Custom Type
                    uid: postData.slug,
                    lang: "en-us",
                    data: {
                    title: [
                        {
                            type: "heading1",
                            text: postData.title.rendered.trim(),
                            spans: [],
                        },
                    ],
                    publishDate: postData.date.split("T")[0], // Converts to YYYY-MM-DD
                    content: postData.content.rendered
                            .replace(/<[^>]+>/g, "") // Remove HTML tags
                            .split("\n") // Ensure new lines remain
                            .map((line) => ({
                            type: "paragraph",
                            text: line.trim(),
                            spans: [],
                        })),
                    },
                },
                postData.title.rendered
                );

            }
        } catch (error) {
            console.log("Error");
        }


      } catch (error) {
        console.error("Error fetching posts:", error);
      }

    await writeClient.migrate(migration, {
        reporter: (event) => console.log(event),
      });




