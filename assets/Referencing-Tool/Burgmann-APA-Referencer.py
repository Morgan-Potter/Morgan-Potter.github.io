referencing = True
filename = input('What is the name of your references? ')
references = open(filename + '.rtf', "w")
references.write("""{\\rtf1 \n""")

while referencing:
    while True:
        type = input('Reference type (book, journal or website): ').lower()
        if type in ['book', 'journal', 'website']:
            break
        else:
            print('Not a correct input.')
    author_last = []
    author_first = []
    author_init = []
    while True:
        author = input('Author {First name} {last name}: ')
        if author == '':
            break
        author_last.append(author.split(' ')[1])
        author_first.append(author.split(' ')[0])
        author_init.append((list(author.split(' ')[0])[0]))
        
    year = input('Copyright / publish year (xxxx): ')
    title = input('Title of work or journal article: ')

    if type == 'book':
        publisher = input('Publisher: ')
        references.write('       ')
        if len(author_last) > 1:
            for author in range(len(author_last)):
                if not (author + 1 == len(author_last)):
                    references.write(f'{author_last[author]}, {author_init[author]}. & ')
                else:
                    references.write(f'{author_last[author]}, {author_init[author]}. ')
        else:
            references.write(f'{author_last[0]}, {author_init[0]}. ')
        references.write(f'({year}). ' + """\\i """ + title + '. ' + """\\i0""" + f'{publisher}.' + """ \line\n""")


    if type == 'journal':
        volume = input('Volume: ')
        issue = input('Issue: ')
        page = input('Page range (pp-pp): ')
        jtitle = input('Journal Title: ')
        references.write('       ')
        if len(author_last) > 1:
            for author in range(len(author_last)):
                if not (author + 1 == len(author_last)):
                    references.write(f'{author_last[author]}, {author_init[author]}. & ')
                else:
                    references.write(f'{author_last[author]}, {author_init[author]}. ')
        else:
            references.write(f'{author_last[0]}, {author_init[0]}. ')  
        references.write(f'({year}). {title}. ' + """\\i """ + jtitle + '. ' + """\\i0""" + f'{volume} ({issue}), {page}.' + """ \line\n""")
    
    if type == 'website':
        url = input('URL: ')
        corporate = input("Corporate Author (y/n)? ") == 'y'
        references.write('       ')
        if corporate == True:
            author_corp = input("Corporate Author NAME: ")
            references.write(f'{author_corp} ')
        else:
            if len(author_last) > 1:
                for author in range(len(author_last)):
                    if not (author+1 == len(author_last)):
                        references.write(f'{author_last[author][0]}, {author_init[author]}. & ')
                    else:
                        references.write(f'{author_last[author]}, {author_init[author]}. ')
            else:
                references.write(f'{author_last[0]}, {author_init[0]}. ')
        references.write(f'({year}). ' + """\\i """ + title + '. ' + """\\i0""" + f'{url}' + """ \line\n""")
    
    referencing = input('Want to add another source (Y/N): ').lower() == 'y'

references.write('}')
